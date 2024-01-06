import { Router } from "express";
import controller from "../controllers/question.controller";
import { verifyAdmin } from "../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/question", [verifyAdmin], controller.create);

export default route;
