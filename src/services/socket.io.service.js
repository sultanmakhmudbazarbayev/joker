import socketIO from "socket.io";
import _ from "lodash";

const socketService = {
  init: async (server) => {
    try {
      const io = await socketIO(server, {
        pingTimeout: 60000,
        transports: ["websocket", "polling"],
        cors: { origin: "*" },
      });

      io.on("connection", async (socket) => {

        socket.on("join-room", (data) => {
          const sessionNumber = data.session.number;
          const team = data.session.team;
          socket.join(data.number);
          console.log('team joined room')

          io.to(sessionNumber).emit("team-joined", { team });
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
