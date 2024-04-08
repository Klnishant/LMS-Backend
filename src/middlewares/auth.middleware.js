import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req,_,next)=> {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if (!token) {
            throw new ApiError(400,"token not found");
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECERET);

        const user = User.findById(decodedToken?.id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(400,"invalid accessToken");
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("invalid access token",error);
    }
});

export {verifyJWT}