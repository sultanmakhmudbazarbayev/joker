import socketIO from "socket.io";
import _ from "lodash";

import QuizSession from "../models/QuizSession";
import Quiz from "../models/Quiz";
import Round from "../models/Round";
import Question from "../models/Question";
import Answer from "../models/Answer";


const initialRound = 1;
const initialPage = 0;
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
            sessionData.current_round = initialRound;
            sessionData.current_page = initialPage;

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
          // socket-client gets teams by correponding tablet number
          // then emits "join-team"
        });
        
        socket.on("join-team", (team) => {
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
        

        io.on("leave-team", (team) => {

          if(team.id && team.name) {
            const updatedTeams = sessionData.teams.filter((sessionTeam) => sessionTeam.id !== team.id)
            sessionData.teams = updatedTeams;
            
            io.to(sessionData.number).emit("team-left", team);
          }
        });

        socket.on("start-session", async (data) => {

          console.log('data', data)
          io.emit("session-started");
      
        });

        socket.on("next-slide", data => {

            console.log('next-slide', data)
            sessionData.current_page = data.page

            io.to(sessionData.number).emit("_next-slide", data);

        });

        socket.on("next-round", data => {

          console.log('next-round', data)
          sessionData.current_page = data.page

          io.to(sessionData.number).emit("_next-round", data);

      });

      socket.on("start-round", data => {

        console.log('start-round', data)
        sessionData.current_page = data.page

        io.to(sessionData.number).emit("_start-round", data);

    });

        socket.on("get-round", async data => {

          console.log('round changed', data.round)

          if(quizData.id) {
            const round = await Round.findOne({
              where: {
                quiz_id: quizData.id,
              },
              include: [
                {
                    model: Question,
                    as: "questions",
                }
            ],
            order: [[{ model: Question, as: 'questions' }, 'order', 'ASC']]
            })
            io.to(sessionData.number).emit("get-round", {round: round});
          }
          
        });

        socket.on("get-all-teams", data => {

          console.log('get-all-teams')
          io.to(sessionData.number).emit("_get-all-teams", {teams: sessionData.teams});
        });

        socket.on("get-all-teams", data => {

          console.log('get-all-teams')
          io.to(sessionData.number).emit("get-all-teams", {teams: sessionData.teams});
        });




        // socket.on("finish-session", (tabletData) => {

        //   quizSessionTeams = [];
        //   sessionNumber = undefined;
        //   quizSession = undefined;
      
          // io.to(sessionNumber).emit("team-joined", {quizSessionTeams});
        // });


        

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
