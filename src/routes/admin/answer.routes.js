import { Router } from "express";
import controller from "../../controllers/admin/answer.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();

route.post("/answer", 
// [verifyAdmin], 
controller.create);

route.put("/answer/:id", 
// [verifyAdmin], 
controller.update);

route.delete("/answer/:id", 
// [verifyAdmin], 
controller.delete);


export default route;
