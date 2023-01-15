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

    async getRepositoryByTribe(params:RepositoryQuery):Promise<Repository[]>{
        console.log(params)
       return await Repository
                                    .createQueryBuilder('repository')
                                    .leftJoinAndSelect('repository.metrics','metrics')
                                    .leftJoinAndSelect('repository.id_tribu','tribe')
                                    .where("repository.id = :id ", { id: params.id } )
                                    .where("repository.id_tribu = :id AND state = :state  AND metrics.coverega >= :coverage", { id: params.id , state:params.state , coverage:params.coverage} )
                                    .getMany()                   
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

    async createRepository(params:RepositoryCreate){

        const tribe = await Tribe.findOneBy({id: params.idTribuId})

        console.log(tribe)

        if(!tribe)
            throw new Error("Not found tribe");
            

        const repository = new Repository()
                            repository.name = params.name
                            repository.state = params.state
                            repository.status = params.status
                            repository.id_tribu = tribe

        return await repository.save()
    }
    
}

export interface RepositoryQuery {
    id?:number
    state?:string
    coverage?:number
}

export interface RepositoryCreate{
    id?:number
    name:string
    state:string
    create_time?:number
    status:string
    idTribuId:number
    metricsIdRepository?:number
}