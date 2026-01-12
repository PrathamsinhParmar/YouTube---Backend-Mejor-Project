import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { APP_JSON_LIMIT } from "./constants.js"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : APP_JSON_LIMIT}))

app.use(express.urlencoded({extended : true, limit : APP_JSON_LIMIT}))

app.use(express.static("public"))   // Here public is the folder, where some images like data stored

app.use(cookieParser())


export {app}