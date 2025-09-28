import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createSession } from 'better-sse';

//supertokens
import supertokens from "supertokens-node";
import './Supertoken.config.api.js'
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";



const app=express()
const PORT=process.env.PORT

//middlwares
app.use(
    cors({
        origin: process.env.WEBSITE_DOMAIN,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }),
);
app.use(middleware());
app.use(express.json())



app.get('/sse',verifySession(),async(req,res)=>{
    const userId=req.session.getUserId()
    const session=await createSession(req,res)
    console.log(userId)

    //get userid and expiry from message broker {userId:qgdgqd-xccxbbn-asbssj,date:983284493274}
    if(userId=='7759a921-b183-4148-a413-0126ccc7a899'){
        //const datafromRMQ=data.date
        //{date:734374}
        session.push({date:98972347923},"planExpiry")
    }
    else{
        
    }
})






app.use(errorHandler()); //supertoken error handler
app.listen(PORT,()=>{
    console.log("sse server is listening")
})