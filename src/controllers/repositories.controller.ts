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

const create = (req:Request,res:Response,next:CallableFunction) =>{

    try {
        const tribe = Tribe.findOneBy({id:1})

        const repository = new Repository()
        repository.name = " node repository"
        repository.status = repositoryState.ENABLE
        repository.status = repositoryState.DISABLE
        repository.id_tribu = tribe

    } catch (error) {
        
    }
}
export {
    gelAllRepositories,
    create
}