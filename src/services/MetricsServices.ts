import { Repository } from "../entities/Repository.entity"
import { Tribe } from "../entities/Tribe.entity"
import { ApiError, ERROR } from "../utils/Errors"
import RepositoryServices, { RepositoryQuery } from "./RepositoriesServices"

export class MetricsServices {
    repository:Repository 
    tribe:Tribe
    repositoryServices:RepositoryServices
    constructor(repositoryServices:RepositoryServices) {
        this.repositoryServices = repositoryServices
    }

    async getMetricsByRepository(queryByDefault:RepositoryQuery):Promise<any>{
        try {

            const repositories:Repository[] = await this.repositoryServices.getRepositoryByTribe(queryByDefault)
            
            if(repositories.length == 0)
                throw new ApiError(ERROR.E004);
            
            return repositories

        } catch (error) {
            
        }
    }
}