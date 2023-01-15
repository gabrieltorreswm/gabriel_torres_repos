export enum ERROR{
    E001 = "La Tribu no se encuentra registrada.",
    E002 = "Something went wrong",
    E003 = "Not Found",
    E004 = "La tribu no tiene repositorios que cumplan con la cobertura necesaria."
}

export enum SUCCESS {
    E001 = "The metrics has been created"
}

export class ApiError extends Error {

    constructor(message: string | undefined){
        super(message)
        this.name = 'ValidationError'
    }

    getMessage(){
        return this.message
    }
}