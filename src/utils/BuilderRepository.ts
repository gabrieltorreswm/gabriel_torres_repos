import { RepositoryDTO } from "../entities/dto/repositoryDTO";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";

export class BuilderRepository{
    repository:Repository[]
    tribe:Tribe

    constructor(repository:Repository[],tribe?:Tribe){
        this.repository = repository

        if(!tribe)
            throw new Error("Tribe is required");
            
        this.tribe = tribe
    }
    
    getResponse():RepositoryDTO[]{
        let response:RepositoryDTO[] = []

        this.repository.map((rep) =>{
            const repository:RepositoryDTO = new RepositoryDTO()
            repository.id = rep.id
            repository.name = rep.name
            repository.tribe = this.tribe.name
            repository.coverage = String(rep.metrics.coverega)
            repository.codeSmells = rep.metrics.code_smells
            repository.bugs = rep.metrics.bugs
            repository.vulnerabilities = rep.metrics.vulnerabilities
            repository.hotspots = rep.metrics.hotspot
            repository.verificationState = rep.state
            repository.state = rep.state
            


            response.push(repository)
        })

        return response
    }
}