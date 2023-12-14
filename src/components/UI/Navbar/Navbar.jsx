import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import cl from './Navbar.module.css'
import logo from '../../../images/app_logo.png'
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const Navbar = () => {
    const {store} = useContext(Context)
    return (
        <div className={cl.navbar}>
            <img src={logo} alt="logo" className={cl.navbar__logo}/>
            {/*<div className={cl.lnkContainer}>*/}
                <Link className={cl.navbar__links} to="/new-reservation">
                    RESERVE
                </Link>
                <Link className={cl.navbar__links} to="/zones">
                    ZONES
                </Link>
                <Link className={cl.navbar__links} to="/welcome">
                    HOME
                </Link>
                <Link className={cl.navbar__links} to="/profile">
                    PROFILE
                </Link>
                <Link className={cl.navbar__links} to="/about">
                    ABOUT
                </Link>
                <button className={cl.navbar__links}
                      onClick={() => store.logout()}>
                    LOGOUT
                </button>
            {/*</div>*/}
        </div>
    );
};

export default observer(Navbar);