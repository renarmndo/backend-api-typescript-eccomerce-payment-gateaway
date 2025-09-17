export const sessionAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            msg: "Not logged In",
        });
    }
    next();
};
//# sourceMappingURL=session.middleware.js.map