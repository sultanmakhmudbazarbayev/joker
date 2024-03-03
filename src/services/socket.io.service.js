import socketIO from "socket.io";
import _ from "lodash";

import QuizSession from "../models/QuizSession";
import Quiz from "../models/Quiz";
import Round from "../models/Round";
import Question from "../models/Question";
import Answer from "../models/Answer";


const initialRound = 1;
const sessionData = {
  teams: [],
  current_round: initialRound,
}
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

          socket.emit("connect-tablet", { message: "Tablets connection initiated" });
          // socket-client gets teams by correponding tablet number
          // then emits "join-team"
        });
        
        socket.on("join-team", (team) => {
          if(team.id && team.name) {
            sessionData.teams.push(team)
            
            
            console.log(`team connected to room ${sessionData.number}`)
            socket.join(sessionData.number);
            
            io.to(sessionData.number).emit("team-joined", team);
          }
        });

        socket.on("leave-team", (team) => {

          if(team.id && team.name) {
            const updatedTeams = sessionData.teams.filter((sessionTeam) => sessionTeam.id !== team.id)
            sessionData.teams = updatedTeams;
            
            io.to(sessionData.number).emit("team-left", team);
          }
        });

        socket.on("start-round", async (round) => {

          if(round.new) {
            sessionData.current_round += 1;
          }
        
          const roundData = await Round.findOne({
            where: {
              count: sessionData.current_round,
              quiz_id: quizData.id
            },
              include: [
                {
                    model: Question,
                    as: "questions",
                    order: [['order', 'ASC']],
                    include: [
                        {
                            model: Answer,
                            as: "answers",
                            order: [['created_at', 'ASC']]
                        },
                    ],
                    
                }
            ]
          })
        
      
          io.to(sessionData.number).emit("round-started", roundData);
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
