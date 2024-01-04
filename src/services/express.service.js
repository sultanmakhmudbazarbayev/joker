import express from "express";
import cors from "cors";
import http from "http";
import globalErrorHandler from "../middlewares/errorHandler.middleware.js";
import { getFiles } from "../utils/index.js";

const applyRoutes = async (path, routes) => {
  const data = [];
  for (const file of routes) {
    const route = await import(`${path}${file}`);
    data.push(route.default);
  }

  return data;
};

const routePath = "../routes/";
const routeFiles = getFiles(`/${routePath}`);

const expressService = {
  init: async () => {
    try {
      /*
        Loading routes automatically
      */
      let routes = await applyRoutes(routePath, routeFiles);

      const app = express();
      const server = http.createServer(app);

      app.use(express.json());
      app.use(cors());
      app.use(express.urlencoded({ extended: true }));

      app.use((req, res, next) => {
        // req.io = io;
        return next();
      });

      // app.use([...routes]);
      app.use(globalErrorHandler);

      server.listen(process.env.PORT || 3001);
      console.log("[EXPRESS] Express initialized");
    } catch (error) {
      console.log("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
