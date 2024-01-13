import { Router } from "express";
import controller from "../../controllers/admin/quiz-session.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/create-session", [verifyAdmin], controller.create);

export default route;
