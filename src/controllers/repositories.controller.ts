import { Request, Response, response } from "express";
import { Mock} from "../entities/types";
import RepositoryServices from "../services/RepositoriesServices";
import { BuilderRepository } from "../utils/BuilderRepository";
import { ApiError, ERROR } from "../utils/Errors";
//import { ERROR } from "../utils/Errors";

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
            throw new ApiError(ERROR.E001);
            
        const repository = await repositoryServices.getRepositoryByTribe(Number(idTribe))
        const builerRepository = new BuilderRepository(repository,tribe)
        return res.json(builerRepository.getResponse())


    } catch (error) {
        console.log(error)
        if(error instanceof ApiError){
            return res.json( 
                { 
                    message: error.getMessage()
                }
            )
        }
        res.json({
            status : 402,
            message: ERROR.E002
        })
    }
}

export {
    gelAllRepositories,
    getRepositoryByTribe
}