import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default interface AuthRequest extends Request{
    user?:{id:string ,username:string};
}
export const AuthMiddleware = (req:AuthRequest , res:Response , next:NextFunction)=>{
    const token = req.headers["authorization"];
    if(!token) return res.status(403).json({error:"Access denied"});
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET as string) as{
            id:string ;
            username:string;
        }
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({error:"Invalid or expired token"});
    }
}
