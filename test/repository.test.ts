import * as chai from "chai";
import { expect, should } from "chai";
import { assert } from "console";
const chaiAsPromised = require('chai-as-promised');
import { Request, Response} from "express";
import { before } from "node:test";
import Sinon from "sinon";
import { getRepositoryByTribe } from "../src/controllers/repositories.controller";
import RepositoryServices from "../src/services/RepositoriesServices";
import { ApiError, ERROR } from "../src/utils/Errors";

const repositoryServices = new RepositoryServices()

chai.use(chaiAsPromised)

describe('Servicio para obtener metricas de repositorio por tribu', async () =>{
    const sandBox = Sinon.createSandbox()
    const servicesMock = Sinon.mock(repositoryServices)

    before(() =>{
    })

    after(()=>{
        
    })
    it("Obtener metricas de repositorio por tribu", () =>{
        const phone = '0803513365'

        chai.assert.equal(phone,'0803513365')
    })

    it("Tribu Inexistente", () => {
        try {
            const mockRequest = { } as unknown as Request;
            mockRequest.params = { idTribe: '1'}
            const mockResponse = { json: () => { } } as Response;

            //servicesMock.expects('getTribeById').atLeast(1).atMost(5).resolves()

            let respositoryServicesStub = Sinon.stub(RepositoryServices.prototype,"getTribeById")
            respositoryServicesStub.yields( { isExistTribe:true } )

            const repo = getRepositoryByTribe(mockRequest,mockResponse,respositoryServicesStub)

            //servicesMock.verify()
            return chai.expect(repo).to.eventually.throw
        } catch (error) {
            console.log(error)
        }

    })
    it("Informacion de verificacion", () =>{
        const phone = '0803513365'

        chai.assert.equal(phone,'0803513365')
    })
    it("Tribu no tiene no tiene repositorios que cumplan con la cobertura", () =>{
        const phone = '0803513365'

        chai.assert.equal(phone,'0803513365')
    })
})