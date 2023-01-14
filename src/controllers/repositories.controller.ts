import { Router, Request, Response, response } from "express";
import { RepositoryDTO } from "../entities/dto/repositoryDTO";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";
import { Mock, repositoryState, verificationCode } from "../entities/types";
import RepositoryServices from "../services/RepositoriesServices";
import { BuilderRepository } from "../utils/BuilderRepository";

const gelAllRepositories = async (req:Request,res:Response,next:CallableFunction) =>{

    try {
        const repositoryServices = new RepositoryServices()
        const params = new Mock()
        params.isMock = true

        const repositories = await repositoryServices.getRepository(params)
        res.json(repositories)
    } catch (error) {
        
    }
}


const getRepositoryByTribe = async (req:Request,res:Response,next:CallableFunction) =>{

   
    try {
        const { idTribe } = req.params
        
        const repositoryServices = new RepositoryServices()
        const { isExistTribe, tribe } = await repositoryServices.getTribeById(Number(idTribe))
        
        if(!isExistTribe)
            throw new Error("I dont found tribe");
            
        const repository = await repositoryServices.getRepositoryByTribe(Number(idTribe))
        const builerRepository = new BuilderRepository(repository,tribe)
        return res.json(builerRepository.getResponse())


    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }
}

export {
    gelAllRepositories,
    getRepositoryByTribe
}