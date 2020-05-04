import { Container } from "@material-ui/core";
import React from "react";
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import AuthGuard from "./components/AuthGuard/authGuard";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import AddGame from "./pages/AddGame/AddGame";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditGameCard from "./pages/EditGameCard/EditGameCard";
import Login from "./pages/Login/Login";
import { useAuth0 } from "./services/auth0.service";
import { fetchUserDataSuccess, fetchUserGamesFromApi } from './store/actions/user.actions';

export default function App() {
    const {loading, isAuthenticated, user} = useAuth0();
    const dispatch = useDispatch();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (isAuthenticated) {
        dispatch(fetchUserDataSuccess(user))
        dispatch(fetchUserGamesFromApi(user.sub))

        return (
            <Router>
                <Header/>
                <Container>
                    <NavBar/>
                    <Switch>
                        <AuthGuard exact path="/" component={Dashboard}/>
                        <AuthGuard path="/edit/:id" component={EditGameCard}/>
                        <AuthGuard path="/add" component={AddGame}/>
                        <AuthGuard component={Dashboard}/>
                    </Switch>
                </Container>
            </Router>
        );
    } else {
        return (
            <div>
                <Header/><Login/>
            </div>
        )
    }
}
