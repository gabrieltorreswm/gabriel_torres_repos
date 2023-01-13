import { Router, Request, Response } from "express";
import { createMetrics ,getMetricsByTribe} from "../controllers/metrics.controllers";
import { createOrg, deleteOrg, editOrg, getOrg } from "../controllers/organizations.controllers";
import { gelAllRepositories, getRepositoryByTribe } from "../controllers/repositories.controller";
import { getInfo } from "../controllers/tribe.controllers";


const router = Router()

// Repositories resources
router.get('/repositores', gelAllRepositories)
router.get('/repositores/:idTribe', getRepositoryByTribe)

//Organization resources
router.post ('/organizations/',createOrg)
//router.post('/organizations/:id',editOrg)
router.get('/organizations/',getOrg)
router.delete('/organizations/:id',deleteOrg)

//Tribe resources
router.get ('/tribe/:id', getInfo)

// metrics 
router.post('/metrics',createMetrics)
router.get('/metrics/:id',getMetricsByTribe)


export default router