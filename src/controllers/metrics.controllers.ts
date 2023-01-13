import { Router, Request, Response } from "express";
import { Metrics } from "../entities/Metrics.entity";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";
import RepositoryServices from "../services/RepositoriesServices";

const createMetrics = async (req:Request,res:Response,next:CallableFunction) =>{

    try {
        const { idRepository , coverega , bugs , vulnerabilities , code_smells , hotspot} = req.body

        const repository = await Repository.findOneBy({id:idRepository})

        if(!repository)
            throw new Error(" I found repository");
            
        const metrics = new Metrics()
        metrics.coverega = coverega
        metrics.bugs = bugs
        metrics.vulnerabilities = vulnerabilities
        metrics.code_smells = code_smells
        metrics.hotspot = hotspot

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

        const repositoryServices = new RepositoryServices()
        const { isExistTribe, tribe } = await repositoryServices.getTribeById(Number(id))
        
        if(!isExistTribe)
            throw new Error("I dont found tribe");
        

        const repository = await Repository
                                .createQueryBuilder('repository')
                                .leftJoinAndSelect('repository.metrics','metrics')
                                .leftJoinAndSelect('repository.id_tribu','tribe')
                                .where("repository.id = :id", { id: tribe?.id } )
                                .where("repository.id_tribu = :id", { id: tribe?.id } )
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

const generateCSV = async (req:Request,res:Response,next:CallableFunction) =>{

    try {
        const { id } = req.params

        const tribe = await Tribe.findOneBy({id: Number(id)})
        
        if(!tribe)
            throw new Error("I dont found tribe");
        

        const repository = await Repository
                                .createQueryBuilder('repository')
                                .leftJoinAndSelect('repository.metrics','metrics')
                                .leftJoinAndSelect('repository.id_tribu','tribe')
                                .where("repository.id = :id", { id: tribe.id } )
                                .where("repository.id_tribu = :id", { id: tribe.id } )
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
    getMetricsByTribe,
    generateCSV
}