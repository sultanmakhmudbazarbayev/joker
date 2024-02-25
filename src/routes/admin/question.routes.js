import { Router } from "express";
import controller from "../../controllers/admin/question.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();

route.post("/question", 
// [verifyAdmin], 
controller.create);

route.put("/question/:id", 
// [verifyAdmin], 
controller.update);

route.get("/question/:id", 
// [verifyAdmin], 
controller.get_question_by_id);

route.get("/question-types", 
// [verifyAdmin], 
controller.get_question_types);

route.post("/question-types", 
// [verifyAdmin], 
controller.create_question_types);

route.get("/question-types/:id", 
// [verifyAdmin], 
controller.get_question_type_by_id);

route.post("/question-time", 
// [verifyAdmin], 
controller.create_question_time);

route.get("/question-time", 
// [verifyAdmin], 
controller.get_question_time);


export default route;
