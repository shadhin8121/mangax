const rateLimit = require("express-rate-limit");

//rate limit for login and register route
const login_and_register_limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many attempts. please try again later",
});

module.exports = {
    login_and_register_limiter,
};
