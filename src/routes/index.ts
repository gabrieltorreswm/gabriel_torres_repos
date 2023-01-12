import { Router, Request, Response } from "express";
import { createOrg, deleteOrg, editOrg, getOrg } from "../controllers/organizations.controllers";
import { gelAllRepositories } from "../controllers/repositories.controller";
import { getInfo } from "../controllers/tribe.controllers";


const router = Router()

// Repositories resources
router.get('/repositores', gelAllRepositories)

//Organization resources
router.post ('/organizations/',createOrg)
//router.post('/organizations/:id',editOrg)
router.get('/organizations/',getOrg)
router.delete('/organizations/:id',deleteOrg)

//Tribe resources
router.get ('/tribe/:id', getInfo)


export default router