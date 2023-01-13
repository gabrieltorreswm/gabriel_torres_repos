import { Router, Request, Response, response } from "express";
import { RepositoryDTO } from "../entities/dto/repositoryDTO";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";
import { repositoryState, verificationCode } from "../entities/types";
import { BuilderRepository } from "../utils/BuilderRepository";

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


const getRepositoryByTribe = async (req:Request,res:Response,next:CallableFunction) =>{

   
    try {
        const { idTribe } = req.params
        
        const tribe_organization = await Tribe.createQueryBuilder('tribe')
                                               .leftJoinAndSelect('tribe.id_organization','organization')
                                               .where('tribe.id = :id',{ id:idTribe})
                                               .getOne()

        if(!tribe_organization)
            throw new Error("I not found tribe");
            
        const repository = await Repository
                                .createQueryBuilder('repository')
                                .leftJoinAndSelect('repository.metrics','metrics')
                                .leftJoinAndSelect('repository.id_tribu','tribe')
                                .where("repository.id = :id", { id: idTribe} )
                                .where("repository.id_tribu = :id", { id: idTribe} )
                                .getMany()

        
        
        const builerRepository = new BuilderRepository(repository,tribe_organization)



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