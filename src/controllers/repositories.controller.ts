import { Router, Request, Response } from "express";

const gelAllRepositories = (req:Request,res:Response,next:CallableFunction) =>{

    try {
        res.json({
            "repositories": [
                {
                "id": 1, "state": 604
                }, {
                "id": 2,
                "state": 605 },
                {
                "id": 3, "state": 606
                } ]
        })
    } catch (error) {
        
    }
}
export {
    gelAllRepositories
}