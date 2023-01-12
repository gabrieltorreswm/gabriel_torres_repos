import { Router, Request, Response } from "express";
import { Metrics } from "../entities/Metrics.entity";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";

const createMetrics = async (req:Request,res:Response,next:CallableFunction) =>{

    try {
        const { idRepository } = req.body

        const repository = await Repository.findOneBy({id:idRepository})

        if(!repository)
            throw new Error(" I found repository");
            
        const metrics = new Metrics()
        metrics.coverega = 10
        metrics.bugs = 20
        metrics.vulnerabilities = 1
        metrics.code_smells = 20
        metrics.hotspot = 1

        await metrics.save()

        repository.metrics = metrics
        await repository.save()

        return res.json({
            status: "ok",
            message:"The metrics has been created"
        })

    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }
}

const getMetricsByTribe = async (req:Request,res:Response,next:CallableFunction) =>{

    try {
        const { id } = req.params

        const tribe = await Tribe.findOneBy({id: Number(id)})
        
        if(!tribe)
            throw new Error("I dont found tribe");
        

        const repository = await Repository
                                .createQueryBuilder('repository')
                                .where("repository.id = :id", { id: tribe.id } )
                                .innerJoinAndSelect('repository.metrics','metrics')
                                //.select('metrics')
                                .getMany()

        return res.json(repository)
    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }
}

export {
    createMetrics,
    getMetricsByTribe
}