import { Router, Request, Response } from "express";
import { verificationCode } from "../entities/types";

const gelAllRepositories = (req:Request,res:Response,next:CallableFunction) =>{

    try {
        res.json({
            "repositories": [
                {
                    "id": 1, "state": verificationCode.VERIFIED
                }, 
                {
                    "id": 2,
                    "state": verificationCode.PENDING 
                },
                {
                    "id": 3, "state": verificationCode.APPROVED
                } ]
        })
    } catch (error) {
        
    }
}
export {
    gelAllRepositories
}