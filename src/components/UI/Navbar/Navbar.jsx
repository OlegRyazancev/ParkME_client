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
            <div style={{backgroundColor: 'transparent'}}>
                <Link className={cl.navbar__links} to="/home">HOME</Link>
                <Link className={cl.navbar__links} to="/about">ABOUT</Link>
                <Link className={cl.navbar__links} to="/profile">PROFILE</Link>
                <button onClick={() => store.logout()}>Logout</button>
            </div>
        </div>
    );
};

export default observer(Navbar);