import { sendError } from "../utils/response.utils.js";
import { validationResult } from "express-validator";
export const validateRequest = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const firstErrorMsg = error.array()[0]?.msg;
        return sendError(res, 400, firstErrorMsg);
    }
    next();
};
//# sourceMappingURL=validator.middleware.js.map