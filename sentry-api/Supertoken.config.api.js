import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";

//reciepe
import ThirdParty from "supertokens-node/recipe/thirdparty";

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: process.env.DATABASE_URL
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
                            clientId: process.env.CLIENT_ID,
                            clientSecret: process.env.CLIENT_SECRET
                        }]
                    }
                }]
            }
        }),
        Session.init() // initializes session features
    ]
});
