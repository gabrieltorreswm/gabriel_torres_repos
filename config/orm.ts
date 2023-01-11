import { createConnection } from "net";
import { join } from "path";
import "reflect-metadata"
import { DataSource, createConnections } from "typeorm"

const connectDB = new DataSource({
    type: "cockroachdb",
    url: process.env.DATABASE_URL,
    ssl: true,
    synchronize: true,
    logging: false,
    entities: ['dist/src/entities/**/*.js']
});

connectDB
    .initialize()
    .then(() =>{
        console.log("DB has been initialize")
    })
    .catch((err)=>{
        console.log("DB Error connection", err)
    })

export default connectDB
