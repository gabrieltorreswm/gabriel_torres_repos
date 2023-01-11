import { Router, Request, Response } from "express";
import { gelAllRepositories } from "../controllers/repositories.controller";

const router = Router()

router.get('/repositores', gelAllRepositories)

router.get('/v1',( req: Request, res:Response) =>{

    res.send(' I am v1')
})

// router.post('/repo', async ( req: Request, res:Response) =>{
//     res.send(' Repo post')
// })


export default router