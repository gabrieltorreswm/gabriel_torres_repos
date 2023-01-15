import { Router, Request, Response } from "express";
import { createMetrics , generateCSV} from "../controllers/metrics.controllers";
import { createOrg, deleteOrg, getOrg } from "../controllers/organizations.controllers";
import { createRepository, gelAllRepositories, getRepositoryByTribe } from "../controllers/repositories.controller";
import { getInfo } from "../controllers/tribe.controllers";
import { MetricsServices } from "../services/MetricsServices";
import RepositoryServices from "../services/RepositoriesServices";


const router = Router()
const repositoryServices = new RepositoryServices()
const metricsServices = new MetricsServices(repositoryServices)

// Repositories resources
router.get('/repositores', (req,res)=> gelAllRepositories(req,res,repositoryServices))
router.get('/repositores/:idTribe/:state/:coverage/:year', (req,res) => getRepositoryByTribe(req,res,repositoryServices))
router.post('/repositores',(req,res) =>createRepository(req,res,repositoryServices))
//Organization resources
router.post ('/organizations/',createOrg)
//router.post('/organizations/:id',editOrg)
router.get('/organizations/',getOrg)
router.delete('/organizations/:id',deleteOrg)

//Tribe resources
router.get ('/tribe/:id', getInfo)

// metrics 
router.post('/metrics',createMetrics)
router.get('/metrics/csv/:idTribe/:state/:coverage/:year',(req,res) => generateCSV(req,res,metricsServices,repositoryServices))


export default router