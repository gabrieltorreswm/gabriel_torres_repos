import { repositoryStatus } from "../entities/types"

const getOrganizationStatus = (status:string) =>{

    switch (status) {
        case repositoryStatus.ACTIVE:
            return repositoryStatus.ACTIVE
        case repositoryStatus.INACTIVE:
            return repositoryStatus.INACTIVE    
        default:
            throw new Error("Status not found");
    }
}

export {
    getOrganizationStatus
}