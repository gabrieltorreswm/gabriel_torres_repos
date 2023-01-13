import { Repository } from "../entities/Repository.entity"
import { Tribe } from "../entities/Tribe.entity"


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
    
}