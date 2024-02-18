import { Router } from "express";
import controller from "../../controllers/admin/quiz.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();

route.get("/quizzes/:id", 
// [verifyAdmin], 
controller.getQuizById);

route.get("/quizzes", 
// [verifyAdmin], 
controller.get);

route.post("/quiz", 
// [verifyAdmin], 
controller.create);

route.patch("/quiz/:id", 
// [verifyAdmin], 
controller.update);

export default route;
