import { Any } from "typeorm"
import { Repository } from "../entities/Repository.entity"
import { Tribe } from "../entities/Tribe.entity"
import { Mock, verificationCode } from "../entities/types"


export default class RepositoryServices {
    repository:Repository 
    tribe:Tribe

    constructor(){}

    async getTribeById(idTribe:number):Promise<{ isExistTribe:boolean, tribe?:Tribe}>{
        const tribe = await Tribe.createQueryBuilder('tribe')
                                .leftJoinAndSelect('tribe.id_organization','organization')
                                .where('tribe.id = :id',{ id:idTribe})
                                .getOne()

        if(!tribe)
            return { isExistTribe:false }
        return { isExistTribe:true , tribe }
    }

    async getRepositoryByTribe(idTribe:number):Promise<Repository[]>{
        const repository = await Repository
                                    .createQueryBuilder('repository')
                                    .leftJoinAndSelect('repository.metrics','metrics')
                                    .leftJoinAndSelect('repository.id_tribu','tribe')
                                    .where("repository.id = :id", { id: idTribe} )
                                    .where("repository.id_tribu = :id", { id: idTribe} )
                                    .getMany()

        return repository                       
    }

    async getRepository(params:Mock):Promise<any>{

        if(params.isMock){
            return {
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
            }
        }

        // call the services
        return {}
    }
    
}