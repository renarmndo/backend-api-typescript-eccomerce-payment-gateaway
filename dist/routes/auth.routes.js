import express from "express";
import { RegisterController, LoginController, } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator, } from "../validator/auth.validator.js";
import { validateRequest } from "../middleware/validator.middleware.js";
import { whitelistFields } from "../middleware/auth.middleware.js";
const routes = express.Router();
routes.post("/", whitelistFields, registerValidator, validateRequest, RegisterController);
// login
routes.post("/login", whitelistFields, loginValidator, validateRequest, LoginController);
export default routes;
//# sourceMappingURL=auth.routes.js.map