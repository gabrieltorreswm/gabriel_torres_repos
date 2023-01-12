import { Router, Request, Response } from "express";
import connectDB from "../../config/orm";
import { Organization } from "../entities/Organitazion.entity";
import { Repository } from "../entities/Repository.entity";

connectDB.getRepository(Organization)

const createOrg = (req:Request,res:Response,next:CallableFunction) =>{
    
    try {
        // const repositoyEntity = new Repository()
        // repositoyEntity.id_tribu = 1
        // repositoyEntity.name = "node_js"
        // repositoyEntity.state =
    } catch (error) {
        
    }
}
const editOrg = (req:Request,res:Response,next:CallableFunction) =>{}
const getOrg = (req:Request,res:Response,next:CallableFunction) =>{}
const deleteOrg = (req:Request,res:Response,next:CallableFunction) =>{}


export {
    createOrg,
    editOrg,
    getOrg,
    deleteOrg
}