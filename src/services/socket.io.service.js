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

        socket.on("disconnect", async () => {

        });
        socket.on("join", (channel) => {
        
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
