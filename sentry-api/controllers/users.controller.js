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

    try{
        const existingUser=await db
        .select()
        .from(usersinfoTable)
        .where(eq(usersinfoTable.userId,userId))

        if(existingUser.length===0){
            const {metadata}=await UserMetadata.getUserMetadata(userId) //calling supertokens database
            const currentExpiry=0 //becasue previously there is no expiry

            const {activeon,expiry}=setExpiry(30,currentExpiry)
            
            await db.insert(usersinfoTable).values({ //calling users database(user_info table)
                userId:userId,
                name:metadata.name,
                email:metadata.email,
                emailVerified:metadata.email_verified,
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