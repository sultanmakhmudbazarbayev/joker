import { Router } from "express";
import controller from "../../controllers/admin/question.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();

route.post("/question", 
// [verifyAdmin], 
controller.create);

route.get("/question/:id", 
// [verifyAdmin], 
controller.get_question_by_id);

export default route;
