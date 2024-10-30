import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./GlobalStyles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import OpenProvider from "./contexts/OpenContext/OpenContext";
import AxiosProvider from "./contexts/AxiosContext/AxiosContext";
import QuickShopProvider from "./contexts/QuickShopContext/QuickShopContext";

import "aos/dist/aos.css";
import "tippy.js/dist/tippy.css";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <SkeletonTheme>
        <BrowserRouter>
          <QuickShopProvider>
            <OpenProvider>
              <AxiosProvider>
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                >
                  <React.StrictMode>
                    <GlobalStyles>
                      <App />
                    </GlobalStyles>
                  </React.StrictMode>
                </GoogleOAuthProvider>
              </AxiosProvider>
            </OpenProvider>
          </QuickShopProvider>
        </BrowserRouter>
      </SkeletonTheme>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
