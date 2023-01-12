import { Router, Request, Response } from "express";
import { Organization } from "../entities/Organitazion.entity";
import { Tribe } from "../entities/Tribe.entity";
import { getOrganizationStatus } from "../utils/utils";

const createOrg = async (req:Request,res:Response,next:CallableFunction) =>{
    
    try {
        console.log('response',req.body)
        const { name , status } = req.body

        const tribe = new Tribe()
        tribe.name = 'Leones'
        tribe.status = 1

        await tribe.save()

        const organization = new Organization()
        organization.name = name
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