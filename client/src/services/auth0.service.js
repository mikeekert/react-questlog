// client/auth0.service.js
import React, {useContext, useEffect, useState} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import AxiosConfig from "../utils/axios";

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
                                  children,
                                  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                                  ...initOptions
                              }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [auth0Client, setAuth0] = useState({});
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
            setAuth0(auth0FromHook);

            if (window.location.search.includes("code=") &&
                window.location.search.includes("state=")) {
                const {appState} = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                AxiosConfig.token = await auth0FromHook.getTokenSilently();
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setLoading(false);
        };
        initAuth0().then(r => r);
    }, []);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const user = await auth0Client.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);
        setUser(user);
    };
    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};
