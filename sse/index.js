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

//amqlib
import amqp from "amqplib";


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

//rabbit connections
const connection = await amqp.connect(process.env.RABBIT_URL);
const channel = await connection.createChannel();

// store online client into sse
const onlineClients=new Map()




//store current logedIn user session
app.get('/sse',verifySession(),async(req,res)=>{
    const userId=req.session.getUserId()
   
    const session=await createSession(req,res)

    onlineClients.set(userId,session)
})


//consume message from cronjob-main-queue
try{
    let retryCounter=0
    channel.consume("cronjob-main-queue",function(msg){
        if(msg.content){
            retryCounter=msg.properties.headers["x-retry-count"]

            if(retryCounter>=3){
                channel.reject(msg,false)
            }
            else{                        
                try {
                    const message = JSON.parse(msg.content.toString());

                    // process message (only once)
                    const currentuserId = message.userId;
                    const currentuserexpiryDate = message.expiryDate;
                    const currentuserplanStatus = message.planStatus;

                    const currentUserSession = onlineClients.get(currentuserId);

                    if (currentUserSession) {
                        currentUserSession.push(
                        {
                            userId: currentuserId,
                            expiryDate: currentuserexpiryDate,
                            planStatus: currentuserplanStatus,
                        },
                        "planExpiry"
                        );
                    }
                    channel.ack(msg);
                } 
                catch(error){
                    console.log(error)
                    retryCounter++    
                    const headers={
                        headers:{
                            "x-retry-count":retryCounter
                        }
                    }
                    channel.publish("cronjob-retry-exchange","cronjob-retry-queue",Buffer.from(msg.content.toString()),headers)
                    channel.ack(msg)
                }
            }
        }
    });
} 
catch(error){
    console.log(error)
}

app.use(errorHandler()); //supertoken error handler
app.listen(PORT,()=>{
    console.log("sse server is listening")
})