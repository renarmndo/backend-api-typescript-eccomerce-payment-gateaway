export const sendResponse = (res, statusCode, success, msg, data) => {
    return res.status(statusCode).json({
        success,
        msg,
        data,
    });
};
export const sendError = (res, statusCode, msg, data) => {
    return res.status(statusCode).json({
        msg,
    });
};
//# sourceMappingURL=response.utils.js.map