import socketIO from "socket.io";
import _ from "lodash";

import QuizSession from "../models/QuizSession";
let sessionNumber = undefined;
let quizSession = undefined;
let quizSessionTeams = [];

const socketService = {
  init: async (server) => {
    try {
      const io = await socketIO(server, {
        pingTimeout: 60000,
        transports: ["websocket", "polling"],
        cors: { origin: "*" },
      });

      io.on("connection", async (socket) => {

        socket.on("connect-admin", async (data) => {
          try {
            sessionNumber = await QuizSession.generateUniqueSessionNumber();
            quizSession = await QuizSession.create({
              name: data.quiz_session.name,
              image: data.quiz_session.image,
              quiz_id: data.quiz_session.quiz_id,
              number: sessionNumber,
            });
        
            socket.join(sessionNumber);
            io.to(sessionNumber).emit("admin-joined", data);
          } catch (error) {
            console.error("Error during admin connection:", error);
            // Handle the error, perhaps emit an error event or log it
          }
        });
        
        socket.on("connect-tablets", (data) => {
          // Consider emitting a data-carrying event instead of using a callback
          socket.emit("connect-tablet", { message: "Tablets connection initiated" });
        
        });
        
        socket.on("join-team", (tabletData) => {

          const team = tabletData.session.team;
          quizSessionTeams.push(team)
          socket.join(sessionNumber);
      
          io.to(sessionNumber).emit("team-joined", {quizSessionTeams});
        });


        socket.on("close-session", (tabletData) => {

          quizSessionTeams = [];
          sessionNumber = undefined;
          quizSession = undefined;
      
          // io.to(sessionNumber).emit("team-joined", {quizSessionTeams});
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
