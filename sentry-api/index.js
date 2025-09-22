import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//supertokens
import supertokens from "supertokens-node";
import './Supertoken.config.api.js'
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";


//middlewares
import serverErrorhandler from './middlewares/serverErrorhandler.js';

//routes
import order_routes from './routes/order.routes.js'

const app=express()
const PORT=process.env.PORT || 7000

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
app.use('/app/order',verifySession(),order_routes)




app.get('/',(req,res)=>{
	return res.status(200).json({sucess:true,message:"server is connected"})
})


app.use(errorHandler()); //supertoken error handler
app.use(serverErrorhandler) //user define error handler

app.listen(PORT,()=>{
    console.log("server is listening")
})