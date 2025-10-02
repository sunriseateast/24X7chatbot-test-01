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


const connection = await amqp.connect(process.env.RABBIT_URL);
const channel = await connection.createChannel();

//cosume message from cronjob-main-queue
async function consumeExpireusers() {
    return new Promise((resolve,reject)=>{
        try{
            let retryCounter=0
            channel.consume("cronjob-main-queue",function(msg){
                if(msg.content){
                    retryCounter=msg.properties.headers["x-retry-count"]

                    if(retryCounter>=3){
                        channel.reject(msg,false)
                    }
                    else{
                        // console.log("[x] %s", msg.content.toString());
                            
                        try{
                            //perform db operations
                            
                            channel.ack(msg)
                            resolve(msg.content.toString())
                                
                        }
                        catch(error){
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
            reject(error)
        }
    })
}


//throw message using sse
app.get('/sse',verifySession(),async(req,res)=>{
    const userId=req.session.getUserId()
    const session=await createSession(req,res)
    const expiredUserData=await consumeExpireusers()

    console.log(expiredUserData)

    //get userid and expiry from message broker {userId:qgdgqd-xccxbbn-asbssj,date:983284493274}
    if(userId=='7759a921-b183-4148-a413-0126ccc7a899'){
        //const datafromRMQ=data.date
        //{date:734374}
        session.push({userId:userId,expiryDate:98972347923,planStatus:'expired'},"planExpiry")
    }
    else{
        
    }
})





app.use(errorHandler()); //supertoken error handler
app.listen(PORT,()=>{
    console.log("sse server is listening")
})