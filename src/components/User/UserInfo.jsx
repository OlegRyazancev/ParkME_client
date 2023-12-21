import React from 'react';
import cl from "../../pages/UserProfile/UserProfile.module.css";

const UserInfo = ({user}) => {
    return (
        <div>
            <p className={cl.propHeader}>User Info</p>
            <p>
                <span className={cl.propName}>
                    name:
                </span>
                {user.name}
            </p>
            <p>
                <span className={cl.propName}>
                    email:
                </span>
                {user.email}
            </p>
        </div>
    );
};

export default UserInfo;