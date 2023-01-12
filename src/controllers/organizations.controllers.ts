import { Router, Request, Response } from "express";
import { Organization } from "../entities/Organitazion.entity";
import { Repository } from "../entities/Repository.entity";
import { Tribe } from "../entities/Tribe.entity";
import { repositoryState } from "../entities/types";
import { getOrganizationStatus } from "../utils/utils";

const createOrg = async (req:Request,res:Response,next:CallableFunction) =>{
    
    try {
        console.log('response',req.body)
        const { organizationName , status , tribeName , repositoryName} = req.body

        const repository = new Repository()
        repository.name = repositoryName
        repository.status = repositoryState.ENABLE
        repository.state = repositoryState.DISABLE
        //repository.create_time = new Date()

        console.log(repository)

        const tribe = new Tribe()
        tribe.name = tribeName
        tribe.status = 1
        tribe.repository = [repository]

        await tribe.save()

        const organization = new Organization()
        organization.name = organizationName
        organization.status = getOrganizationStatus(status)
        organization.tribe = [tribe]

        await organization.save()

        return res.json({
            status: "ok",
            message:"The organization has been created"
        })
    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }
}


const editOrg = async (req:Request,res:Response,next:CallableFunction) =>{
    try {
        const { name } = req.body
        const { id } = req.params

        const organization = await Organization.findOneBy({
            id : Number(id)
        })

        if(!organization?.name)
            throw new Error("I dont found organization");
        
    
        organization.name = name 
        await organization.save()
        
        return res.json(organization)

    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }

}
const getOrg = async (req:Request,res:Response,next:CallableFunction) =>{
    try {
        const allOrganization = await Organization.find({ relations:{
            tribe:true
        }})
        return res.json(allOrganization)
    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }

}
const deleteOrg = async (req:Request,res:Response,next:CallableFunction) => {
    try {
        const { id } = req.params

        const organization = await Organization.findOneBy({
            id : Number(id)
        })

        if(!organization)
            throw new Error("I dont found organization");

        await organization.remove()
        
        return res.json(organization)

    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }

}


export {
    createOrg,
    editOrg,
    getOrg,
    deleteOrg
}