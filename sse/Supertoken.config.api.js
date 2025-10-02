import supertokens, { User } from "supertokens-node";
import Session from "supertokens-node/recipe/session";

//reciepe
import ThirdParty from "supertokens-node/recipe/thirdparty";
import UserMetadata from "supertokens-node/recipe/usermetadata";


supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_DATABASE_URL
    },
    appInfo: {
        appName: "24X7chatbot",
        apiDomain: process.env.API_DOMAIN,
        websiteDomain: process.env.WEBSITE_DOMAIN,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature:{
                providers:[{
                    config: {
                        thirdPartyId: "google",
                        clients: [{
                            clientId: process.env.GOOGLE_CLIENT_ID,
                            clientSecret: process.env.GOOGLE_CLIENT_SECRET
                        }]
                    }
                }]
            },
            override:{
                functions:(originalImplementation)=>{
                    return{
                        ...originalImplementation,

                        //overriding function on signin/signup
                        signInUp:async function (input) {
                            const response=await originalImplementation.signInUp(input)
                            const userId=response.user.id
                            const metadata=await UserMetadata.getUserMetadata(userId)

                            //if user not exists in supertokens db then only this happended
                            if(!metadata.metadata.email){
                                const user_profile=response.rawUserInfoFromProvider.fromUserInfoAPI
                                const name=user_profile.name
                                const email=user_profile.email
                                const email_verified=user_profile.email_verified

                                await UserMetadata.updateUserMetadata(userId,{
                                    name,
                                    email,
                                    email_verified
                                })
                            }
                            else{
                                console.log("users exists")
                            }
                            return response
                        },
                    }
                }
            }
        }),
        Session.init({
            cookieSameSite: "lax",
            cookieSecure: false,
            exposeAccessTokenToFrontendInCookieBasedAuth: true,
        }) // initializes session features
    ]
});
