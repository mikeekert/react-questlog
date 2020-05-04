import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useAuth0 } from '../../services/auth0.service';
import { IAppState } from '../../store/reducers/root.reducer';
import "./NavBar.scss";

function NavBar(props: any) {
    const {logout} = useAuth0();

    function logoutCall() {
        logout();
        props.history.push('/login')
    }

    const userData = useSelector((state: IAppState) => {
        return state.userReducer.user;
    });

    return <div className="navigation">
        <div className="navigation-menu">
            <ul>
                <section className="section_8bit header">
                    <div className="header-menu wrapper">
                        <Link to={"/"}>
                            <li>
                                <span className="arrowLink">My QuestLog</span>
                            </li>
                        </Link>
                        <Link to={"/add"}>
                            <li>
                                <span className="arrowLink">Add Game</span>
                            </li>
                        </Link>
                        <li onClick={logoutCall}>
                            <span className="logout arrowLink">Quit</span>
                        </li>
                    </div>
                </section>
            </ul>
        </div>
        <div className="greeting">
            <h1>Welcome {userData.name.substr(0, userData.name.indexOf(' '))}</h1>
        </div>
    </div>;
}

export default NavBar;
