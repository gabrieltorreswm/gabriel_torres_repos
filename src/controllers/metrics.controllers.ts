import { Router, Request, Response } from "express";
import { Metrics } from "../entities/Metrics.entity";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";
import { MetricsServices } from "../services/MetricsServices";
import RepositoryServices, { RepositoryQuery } from "../services/RepositoriesServices";
import { ApiError, ERROR, SUCCESS } from "../utils/Errors";

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
            message: SUCCESS.E001
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: 402,
            message: ERROR.E002
        })
    }
}

const generateCSV = async (req:Request,res:Response,metricsServices:MetricsServices,repositoryServices:RepositoryServices) =>{

    try {
        const { idTribe , state, coverage , year} = req.params
        
        const { isExistTribe, tribe } = await repositoryServices.getTribeById(Number(idTribe))
        
        if(!isExistTribe)
            throw new ApiError(ERROR.E001);

        const query:RepositoryQuery = { id: Number(idTribe), state , coverage:Number(coverage) , year}
            
        const repository:Repository[] = await metricsServices.getMetricsByRepository(query)
        

        return res.json(repository)

    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:ERROR.E002
        })
    }
}

export {
    createMetrics,
    generateCSV
}