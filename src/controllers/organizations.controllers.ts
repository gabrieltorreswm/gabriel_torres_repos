import { Router, Request, Response } from "express";=
import { Organization } from "../entities/Organitazion.entity";
import { getOrganizationStatus } from "../utils/utils";

const createOrg = async (req:Request,res:Response,next:CallableFunction) =>{
    
    try {
        console.log('response',req.body)
        const { name , status } = req.body

        const organization = new Organization()
        organization.name = name
        organization.status = getOrganizationStatus(status)

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
const editOrg = (req:Request,res:Response,next:CallableFunction) =>{}
const getOrg = async (req:Request,res:Response,next:CallableFunction) =>{
    try {
        const allOrganization = await Organization.find()
        return res.json(allOrganization)
    } catch (error) {
        console.log(error)
        res.json({
            status:402,
            message:"Something went wrong"
        })
    }

}
const deleteOrg = (req:Request,res:Response,next:CallableFunction) =>{}


export {
    createOrg,
    editOrg,
    getOrg,
    deleteOrg
}