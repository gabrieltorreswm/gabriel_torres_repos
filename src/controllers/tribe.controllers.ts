import { Router, Request, Response } from "express";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";

const getInfo = (req:Request,res:Response,next:CallableFunction) =>{

    // try {
    //     const { id } = req.body.params

    //     const tribe = Tribe.findOneBy({id})
    //     const repository = Repository.createQueryBuilder('Repository').innerJoinAndSelect('metrics','metrics.id')
    // } catch (error) {
        
    // }
}
export {
    getInfo
}