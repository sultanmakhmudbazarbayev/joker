import { Router } from "express";

import controller from "../../controllers/admin/login.controller.js";

const route = Router();

route.post("/login", controller.login);

export default route;
