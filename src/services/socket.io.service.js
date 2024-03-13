import socketIO from "socket.io";
import _ from "lodash";

import QuizSession from "../models/QuizSession";
import Quiz from "../models/Quiz";
import Round from "../models/Round";
import Question from "../models/Question";
import Answer from "../models/Answer";
import TeamAnswer from "../models/TeamAnswers";
import { Op } from "sequelize";
import Team from "../models/Team";
import QuestionTime from "../models/QuestionTime";
import QuestionType from "../models/QuestionType";


const sessionData = {}
const quizData = {}

const socketService = {
  init: async (server) => {
    try {
      const io = await socketIO(server, {
        pingTimeout: 60000,
        transports: ["websocket", "polling"],
        cors: { origin: "*" },
      });

      io.on("connection", async (socket) => {

        socket.on("connect-admin", async (quizId) => {
          try {
            sessionData.teams = [];
            sessionData.results = {};

            const quiz = await Quiz.findByPk(quizId)

            if(!quiz.ready) {
              socket.emit("quiz-not-started", {msg: "Quiz is not saved so session cannot be started"});
            }

            quizData.name = quiz.name;
            quizData.image = quiz.image;
            quizData.id = quiz.id;

            sessionData.number = await QuizSession.generateUniqueSessionNumber();

            if(!sessionData.id) {
              const newSession = await QuizSession.create({
                name: quizData.name,
                image: quizData.image,
                quiz_id: quizData.id,
                number: sessionData.number,
              });

              sessionData.id = newSession.id;
            }

            socket.join(sessionData.number);
            console.log(`admin connected to room ${sessionData.number}`)

          } catch (error) {
            console.error("Error during admin connection:", error);
            // Handle the error, perhaps emit an error event or log it
          }
        });
        
        socket.on("connect-tablets", () => {
          console.log('admin send trigger for tablets to connect')

          io.emit("connect-tablet", { message: "Tablets connection initiated" });

        });
        
        socket.on("join-team", (team) => {
          if(team.role === 'tv') {
            socket.join(sessionData.number);
          }
          if (team.id && team.name) {
            // Check if the team is already in the room
            const alreadyInRoom = sessionData.teams.some(teamInRoom => teamInRoom.id === team.id);
        
            // If not, add the team to the session and join the room
            if (!alreadyInRoom) {
              sessionData.teams.push(team); // Add the team only if it's not already there
              console.log(`Team ${team.name} connected to room ${sessionData.number}`);
              socket.join(sessionData.number);
              io.to(sessionData.number).emit("team-joined", team);
            }
          }
        });

        socket.on("get-questions", async ({round: count}) => {
          if (count) {

            const round = await Round.findOne({
              where: {
                quiz_id: quizData.id,
                count: count
              },
              include: [
                {
                    model: Question,
                    as: "questions",
                    include: [
                      {
                          model: Answer,
                          as: "answers",
                          order: [['created_at', 'ASC']]
                      },
                  ],
                },
            ],
            })

            const updQuestions = await Promise.all(round.questions.map(async (q) => {
              const time = await QuestionTime.findByPk(q.question_time_id);
              const type = await QuestionType.findByPk(q.question_type_id);
              return {
                ...q,
                time: time ? time.time : null,
                type: type ? type.technical_name : null 
              };
            }));
            

            io.to(sessionData.number).emit("_get-questions", {questions: updQuestions});
          }
        });
        

        io.on("leave-team", (team) => {
          if(team.id && team.name) {
            const updatedTeams = sessionData.teams.filter((sessionTeam) => sessionTeam.id !== team.id)
            sessionData.teams = updatedTeams;
            
            io.to(sessionData.number).emit("team-left", team);
          }
        });

        socket.on("start-session", async (data) => {

          io.emit("session-started");
      
        });

        socket.on("next-slide", data => {


            io.to(sessionData.number).emit("_next-slide", data);

        });

        socket.on("prev-slide", data => {


          io.to(sessionData.number).emit("_prev-slide", data);

      });

        socket.on("next-round", data => {


          io.to(sessionData.number).emit("_next-round", data);

        });

        socket.on("start-round", data => {


          io.to(sessionData.number).emit("_start-round", data);

        });


        socket.on("set-team-points", async data => {
          const {roundId, questionId, teamId, points} = data;

          const teamAnswer = await TeamAnswer.findOne({
            where: {
              quiz_session_id: sessionData.id,
              round_id: roundId,
              question_id: questionId,
              team_id: teamId
            }
          })

          if(!teamAnswer) {
            const newTeamAnswer = await TeamAnswer.create({
              quiz_session_id: sessionData.id,
              round_id: roundId,
              question_id: questionId,
              team_id: teamId,
              points: points
            })
          } else {
            teamAnswer.points = points;
            await teamAnswer.save()
          }
        
        });

        socket.on("get-half-statistics", async data => {
          
          const rounds = await Round.findAll({
            where: {
              quiz_id: quizData.id,
              count: {
                [Op.in]: [1,2,3,4]
              },
            },
            order: [["count", 'ASC']]
          })

          const halfResults = [];

          for(const sessionTeam of sessionData.teams) {
            const team = {
              name: sessionTeam.name,
              total: 0,
              date: Date.now()
            }
            for(const round of rounds) {
              const allAnswers = await TeamAnswer.findAll({
                where: {
                  quiz_session_id: sessionData.id,
                  round_id: round.id,
                  team_id: sessionTeam.id,
                }
              })
              const roundTotal = allAnswers.reduce((total, current) => {
                return total + current.points;
              }, 0);

              team[`round_${round.count}`] = roundTotal;
              team.total += roundTotal;
            }

            halfResults.push(team);
          }

          halfResults.sort((a, b) => b.total - a.total);
          
          io
          .to(sessionData.number)
          .emit("_get-half-statistics", {teams: halfResults});
        });

        socket.on("get-8-round-statistics", async data => {
          
          const rounds = await Round.findAll({
            where: {
              quiz_id: quizData.id,
              count: {
                [Op.in]: [1,2,3,4,5,6,7,8]
              },
            },
            order: [["count", 'ASC']]
          })

          const halfResults = [];

          for(const sessionTeam of sessionData.teams) {
            const team = {
              name: sessionTeam.name,
              total: 0,
              date: Date.now()
            }
            for(const round of rounds) {
              const allAnswers = await TeamAnswer.findAll({
                where: {
                  quiz_session_id: sessionData.id,
                  round_id: round.id,
                  team_id: sessionTeam.id,
                }
              })
              const roundTotal = allAnswers.reduce((total, current) => {
                return total + current.points;
              }, 0);

              team[`round_${round.count}`] = roundTotal;
              team.total += roundTotal;
            }

            halfResults.push(team);
          }

          halfResults.sort((a, b) => b.total - a.total);
          
          io
          .to(sessionData.number)
          .emit("_get-8-round-statistics", {teams: halfResults});
        });

        socket.on("get-total-statistics", async data => {
          
          const rounds = await Round.findAll({
            where: {
              quiz_id: quizData.id,
              count: {
                [Op.in]: [1,2,3,4,5,6,7,8,9]
              },
            },
            order: [["count", 'ASC']]
          })

          const halfResults = [];

          for(const sessionTeam of sessionData.teams) {
            const team = {
              name: sessionTeam.name,
              total: 0,
              date: Date.now()
            }
            for(const round of rounds) {
              const allAnswers = await TeamAnswer.findAll({
                where: {
                  quiz_session_id: sessionData.id,
                  round_id: round.id,
                  team_id: sessionTeam.id,
                }
              })
              const roundTotal = allAnswers.reduce((total, current) => {
                return total + current.points;
              }, 0);

              team[`round_${round.count}`] = roundTotal;
              team.total += roundTotal;
            }

            halfResults.push(team);
          }

          halfResults.sort((a, b) => b.total - a.total);
          
          io
          .to(sessionData.number)
          .emit("_get-total-statistics", {teams: halfResults});
        });

        socket.on("get-top-3", async data => {
          
          const rounds = await Round.findAll({
            where: {
              quiz_id: quizData.id,
              count: {
                [Op.in]: [1,2,3,4,5,6,7,8,9]
              },
            },
            order: [["count", 'ASC']]
          })

          const halfResults = [];

          for(const sessionTeam of sessionData.teams) {
            const team = {
              name: sessionTeam.name,
              total: 0,
              date: Date.now()
            }
            for(const round of rounds) {
              const allAnswers = await TeamAnswer.findAll({
                where: {
                  quiz_session_id: sessionData.id,
                  round_id: round.id,
                  team_id: sessionTeam.id,
                }
              })
              const roundTotal = allAnswers.reduce((total, current) => {
                return total + current.points;
              }, 0);

              team[`round_${round.count}`] = roundTotal;
              team.total += roundTotal;
            }

            halfResults.push(team);
          }

          halfResults.sort((a, b) => b.total - a.total);
          
          io
          .to(sessionData.number)
          .emit("_get-top-3", {teams: [halfResults[0], halfResults[1], halfResults[2]]});
        });

        socket.on("get-winner", async data => {
          
          const rounds = await Round.findAll({
            where: {
              quiz_id: quizData.id,
              count: {
                [Op.in]: [1,2,3,4,5,6,7,8,9]
              },
            },
            order: [["count", 'ASC']]
          })

          const halfResults = [];

          for(const sessionTeam of sessionData.teams) {
            const team = {
              name: sessionTeam.name,
              total: 0,
              date: Date.now()
            }
            for(const round of rounds) {
              const allAnswers = await TeamAnswer.findAll({
                where: {
                  quiz_session_id: sessionData.id,
                  round_id: round.id,
                  team_id: sessionTeam.id,
                }
              })
              const roundTotal = allAnswers.reduce((total, current) => {
                return total + current.points;
              }, 0);

              team[`round_${round.count}`] = roundTotal;
              team.total += roundTotal;
            }

            halfResults.push(team);
          }

          halfResults.sort((a, b) => b.total - a.total);
          
          io
          .to(sessionData.number)
          .emit("_get-winner", {teams: halfResults[0]});
        });

        socket.on('join-teams-manually', async data => {
          const { teams } = data;

          console.log('teams', teams)
          
          for(const team of teams) {
            if(team.number !== '777') {
              const teamData = await Team.findByPk(team.id);

              if (teamData.id && teamData.name) {
                // Check if the team is already in the room
                const alreadyInRoom = sessionData.teams.some(teamInRoom => teamInRoom.id === teamData.id);
            
                // If not, add the team to the session and join the room
                if (!alreadyInRoom) {
                  sessionData.teams.push(teamData); // Add the team only if it's not already there
                  io.to(sessionData.number).emit("team-joined", teamData);
                }
              }
            }
          }

          console.log('sessionData.team', sessionData.teams)
        })
        

        socket.on("get-all-teams", data => {

          io.to(sessionData.number).emit("_get-all-teams", {teams: sessionData.teams});
        });

        socket.on("disconnect", async () => {

        });
      });

      console.log("[SOCKET.IO] SOCKET.IO service initialized");
      return io;
    } catch (error) {
      console.log("[SOCKET.IO] Error during service initialization");
      throw error;
    }
  },
};

export default socketService;
