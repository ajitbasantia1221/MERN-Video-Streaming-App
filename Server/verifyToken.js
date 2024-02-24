import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies['access-token'];
    if (!token) return next(createError(401, "You are not authenticated!!"));

    jwt.verify(token, process.env.JWT, (err, user) => { //checkes  the token with the secret key whch we stores in env file.
        if (err) return next(createError(403, "Token Invalid"));
        req.user = user; //If everything is ok then it will assign user id here
        next()  // will continue and use this as a middleware in user.js file of routes
    });
}