import SuperTokens from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import ThirdParty, {Google} from "supertokens-auth-react/recipe/thirdparty";

//Initalize SDK of supertokens
SuperTokens.init({
    appInfo: {
        appName: "24X7chatbot",
        apiDomain: " http://localhost:8000/",
        websiteDomain: " http://localhost:5173/",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        ThirdParty.init({
        signInAndUpFeature: {
            providers: [
                Google.init(),
            ]
        }
        }),
        Session.init()
    ]
});