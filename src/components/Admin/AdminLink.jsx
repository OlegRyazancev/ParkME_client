import React from 'react';
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import cl from "./AdminLink.module.css"

const AdminLink = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    return (
        <>
            {store.user.roles.includes('ROLE_ADMIN') && (
                <div className={cl.adminLinkContainer}>
                    <button onClick={() => navigate('/admin')}>admin</button>
                </div>
            )}
        </>
    );
};

export default AdminLink;
