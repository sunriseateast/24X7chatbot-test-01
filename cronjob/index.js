import express from 'express'
import cors from 'cors'
import amqp from "amqplib";
import 'dotenv/config'
import cron from 'node-cron'
import {Client} from 'pg'

const app=express()
const client=new Client({
  host: 'localhost',
  port: 6432,
  user: 'admineatsmoon',
  password: '$ky!sB!Ue',
  database: 'users'
})


//middlewares
app.use(cors())
app.use(express.json())


//rabitmq connections
const connection = await amqp.connect(process.env.RABBIT_URL);
const channel = await connection.createChannel();
await client.connect()

//push message to cronjob-main-queue
async function publishMessagetomainQueue(message) {
  try {
    console.log("Connected!");  
    //counter
    const headers={
        headers:{
            "x-retry-count":0
        }
    }
    channel.publish("cronjob-main-exchange", "cronjob-main-queue", Buffer.from(message),headers);
    console.log("Message published!");
    setTimeout(() => connection.close(), 500);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

//get list of users from postgresdb and update status
async function getExpiredUsers(){
  try{

    //get all users who's plan is expired
    const res=await client.query(`
      UPDATE users_info
      SET "planStatus" = 'expired'
      WHERE expiry < EXTRACT(EPOCH FROM NOW()) * 1000
      AND "planStatus" != 'expired'
      RETURNING "userId", "expiry"
    `)
    
    //grab user row by row
    res.rows.forEach(row => {
      const message = {
        userId: row.userId,
        expiryDate: row.expiry,
        planStatus: 'expired',
      };
      publishMessagetomainQueue(JSON.stringify(message))
     
    });


  }
  catch(error){
    console.log(error)
  }
}

//run for every minute
cron.schedule('* * * * *', async() => {
  await getExpiredUsers()
});



app.listen(2000,(req,res)=>{
    console.log("cronjob is running")
})