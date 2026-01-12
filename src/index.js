import dotenv from "dotenv"
dotenv.config({
    path : "./env"
})

import { connectDB } from "./db/index.js"
import { app } from "./app.js"

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server Is Running On Port : ${process.env.PORT}`)
    })
    app.on("error", ()=>{
        console.log(`ERROR : ${error}`)
    })
})
.catch((error)=>{
    console.log(`MongoDB Connection Error : ${error}`)
    throw error
})
