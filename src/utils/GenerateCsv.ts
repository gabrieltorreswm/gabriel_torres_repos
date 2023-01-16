import { parse } from 'json2csv'

export class GenerateCsv {

    constructor() {}

    async parse(records:any):Promise<any>{
        return await parse(records)
    }
}