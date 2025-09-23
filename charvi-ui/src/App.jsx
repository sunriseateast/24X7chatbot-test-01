import { BrowserRouter, Routes, Route} from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

//Import supertoken
import '../Supertoken.config.ui.js'
import { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui'
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import Dashboard from "./app/Dashboard";
import Home from "./Home";

function App() {
  return (
    <SuperTokensWrapper>
      <div>
        <BrowserRouter>
          <Routes>
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPreBuiltUI])}
            <Route path="/app" element={
                <Dashboard/>
              }>
            </Route>
            <Route path='/' element={<Home/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </SuperTokensWrapper>
  );
}

export default App;
