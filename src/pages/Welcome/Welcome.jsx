import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../service/UserService";
import Loader from "../../components/UI/Loader/Loader";
import cl from "./Welcome.module.css"
import welcBack from "../../images/welcome_background.png";

const Welcome = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [user, setUser] = useState({});

    const admin = store.user.roles.includes('ROLE_ADMIN');

    const [fetchUser, isLoading] = useFetching(async (id) => {
        setUser((await UserService.getById(id)).data);
    });

    useEffect(() => {
        fetchUser(store.user.id)
    }, []);

    return (
        <div className="App">
            <div className={cl.welcomeContainer}>
                {isLoading && <Loader/>}
                <p>Welcome back, {user?.name}!</p>
                <div>
                    <button onClick={() => navigate("/new-reservation")}>Make a
                        reservation
                    </button>
                    <button onClick={() => navigate("/zones")}>Check places
                    </button>
                </div>
            </div>
            <img src={welcBack} alt="logo" className={cl.welcomeBackground}/>
        </div>
    );
};

export default Welcome;