import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../services/auth0.service";

const AuthGuard = ({component: Component, path, ...rest}: any) => {
    const {loading, isAuthenticated, loginWithRedirect} = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: {targetUrl: window.location.pathname}
            });
        };
        fn().then(r => r);
    }, []);

    const render = (props: any) =>
        isAuthenticated === true ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
};

export default AuthGuard;
