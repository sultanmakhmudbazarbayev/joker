import { Router } from "express";
import controller from "../controllers/team.controller";
import { verifyAdmin } from "../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/team", [verifyAdmin], controller.create);

// route.patch("/team", [verifyAdmin], controller.update);


export default route;
