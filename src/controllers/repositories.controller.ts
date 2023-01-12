import { Router, Request, Response, response } from "express";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";
import { repositoryState, verificationCode } from "../entities/types";

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