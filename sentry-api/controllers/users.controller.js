import UserMetadata from "supertokens-node/recipe/usermetadata";
import { usersinfoTable } from "../models/postgres.schema.js";
import db from '../db/postgres.con.js'
import createError from "http-errors";
import asyncHandler from "../asyncHandler.js";
import setExpiry from "../utils/setExpiry.js";
import { eq } from "drizzle-orm";

export const updateUserinfo=asyncHandler( async(req,res,next)=>{
    const session=req.session
    const userId=session.getUserId()

    if(!userId){
        throw createError(401,"user not found")
    }
    try{
        const existingUser=await db
        .select()
        .from(usersinfoTable)
        .where(eq(usersinfoTable.userId,userId))

        if(existingUser.length===0){
            const {metadata}=await UserMetadata.getUserMetadata(userId) //calling supertokens database
            const currentExpiry=0 //becasue previously there is no expiry
            const days=30 //free trial period

            const {activeon,expiry,duration}=setExpiry(days,currentExpiry)
            
            await db.insert(usersinfoTable).values({ //calling users database(user_info table)
                userId:userId,
                name:metadata.name,
                email:metadata.email,
                emailVerified:metadata.email_verified,
                duration:duration,
                activeon:activeon,
                expiry:expiry
            }).onConflictDoNothing();  // prevent duplicate error
        }
    }
    catch(error){
        console.log(error)
        throw createError(503,"database not available")
    }
})


export const getExpiry=asyncHandler(async(req,res,next)=>{
    const session=req.session
    const userId=session.getUserId()

    if(!userId){
        throw createError(401,"expiry status error")
    }
    else{
        try{
            const result=await db
            .select({expiry:usersinfoTable.expiry})
            .from(usersinfoTable)
            .where(eq(usersinfoTable.userId,userId))
            const currentExpiry=result[0]?.expiry || false

            if(currentExpiry===false){
                throw createError(400,"Invalid user")
            }
            else{
                return res.status(200).json({success:true,message:currentExpiry})
            }

        }
        catch(error){
            throw (503,"database not available")
        }
    }

})