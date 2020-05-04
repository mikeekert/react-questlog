import React from "react";
import hiddenLink from "../../assets/images/150845960378434.gif";
import loginFormLogo from "../../assets/images/150845960378434.png";
import mainLogo from "../../assets/images/crop.gif";
import { useAuth0 } from '../../services/auth0.service';
import "./Login.scss";

function Login() {
    const {loginWithRedirect} = useAuth0();

    return <div className="Login">
        <div>
            <div className="gifContainer">
                <img src={mainLogo} className="homeImg" alt={'home'}/>
            </div>
            <form className="loginFormHome">
                <div>
                    <button className="searchHome loginHome"
                            value="Log In"
                            onClick={() => loginWithRedirect({})}>Login
                    </button>
                    <img src={loginFormLogo} className="imgHomeController" alt={'login'}/>
                </div>
            </form>
            <div className="easter">
                <img src={hiddenLink} alt={'secret Link'}/>
            </div>
        </div>
    </div>;
}

export default Login;
