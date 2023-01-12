import { Router, Request, Response } from "express";
import { createOrg, deleteOrg, editOrg, getOrg } from "../controllers/organizations.controllers";
import { gelAllRepositories } from "../controllers/repositories.controller";

const router = Router()

// Repositories resources
router.get('/repositores', gelAllRepositories)

//Organization resources
router.post ('/organizations/',createOrg)
router.get('/organizations/:id',editOrg)
router.get('/organizations/',getOrg)
router.delete('/organizations/:id',deleteOrg)


export default router