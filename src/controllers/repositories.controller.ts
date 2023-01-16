import { Request, Response, response } from "express";
import { Repository } from "../entities/Repository.entity";
import { Mock} from "../entities/types";
import RepositoryServices, { RepositoryCreate, RepositoryQuery } from "../services/RepositoriesServices";
import { BuilderRepository } from "../utils/BuilderRepository";
import { ApiError, ERROR } from "../utils/Errors";

const gelAllRepositories = async (req:Request,res:Response,repositoryServices:RepositoryServices) =>{

    try {
        const params = new Mock()
        params.isMock = true

        const repositories = await repositoryServices.getRepository(params)
        res.json(repositories)
    } catch (error) {
        
    }
}


const getRepositoryByTribe = async (req:Request,res:Response,repositoryServices:any) =>{

   
    try {
        const { idTribe , state, coverage , year} = req.params
        
        const { isExistTribe, tribe } = await repositoryServices.getTribeById(Number(idTribe))
        
        if(!isExistTribe)
            throw new ApiError(ERROR.E001);

        const query:RepositoryQuery = { id: Number(idTribe), state , coverage:Number(coverage) , year}
            
        const repository:Repository[] = await repositoryServices.getRepositoryByTribe(query)
        
        console.log(repository)
        if(repository.length == 0)
            throw new ApiError(ERROR.E004);
            
        const builerRepository = new BuilderRepository(repository,tribe)
        return res.json(builerRepository.getResponse())


    } catch (error) {
        console.log(error)
        if(error instanceof ApiError){
            return res.status(401).json( 
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


const createRepository = async (req:Request,res:Response,repositoryServices:any) =>{
    try {

        const { name,state,status,idTribeId } = req.body

        const params: RepositoryCreate = {
            name,
            state,
            status:status,
            idTribuId:Number(idTribeId),
        }
        
        const repository = await repositoryServices.createRepository(params)
        
        res.json({
            status : 200,
            repository
        })
    } catch (error) {
        console.log(error)
        res.json({
            status : 402,
            message: ERROR.E002
        })
    }
}

export {
    gelAllRepositories,
    getRepositoryByTribe,
    createRepository
}