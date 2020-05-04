import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import { Auth0Provider } from "./services/auth0.service";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/store";

ReactDOM.render(
    <BrowserRouter>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Provider store={configureStore()}>
            <Auth0Provider
                domain={process.env.REACT_APP_DOMAIN}
                client_id={process.env.REACT_APP_CLIENT_ID}
                redirect_uri={window.location.origin}
                audience={'https://dev-mekert.auth0.com/api/v2/'}
            >
                <App/>
            </Auth0Provider>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
