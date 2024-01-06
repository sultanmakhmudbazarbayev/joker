import { Router } from "express";
import controller from "../controllers/quiz.controller";
import { verifyAdmin } from "../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/quiz", [verifyAdmin], controller.create);

export default route;
