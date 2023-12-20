import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";
import cl from "./User.module.css"

const UserForm = ({action, validation, userId}) => {
    const [user, setUser] = useState({
        name: null,
        email: null,
        password: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            ...user, id: userId
        }
        action(updatedUser);
        setUser({name: '', email: '', password: ''})
    }

    return (
        <div className={cl.formContainer}>
            <p className={cl.formHeader}>Edit user</p>
            <div className={cl.inputContainer}>
                <span>Enter old / new name: </span>
                <input
                    onChange={(e) =>
                        setUser({
                            ...user, name: e.target.value
                        })}
                    type="text"
                    placeholder={"Name"}
                />
            </div>
            <div className={cl.inputContainer}>
                <span>Enter old / new email: </span>
                <input
                    onChange={(e) =>
                        setUser({
                            ...user, email: e.target.value
                        })}
                    type="text"
                    placeholder={"email@example.com"}
                />
            </div>
            <div className={cl.inputContainer}>
                <span>Enter old / new password: </span>
                <input
                    onChange={(e) =>
                        setUser({
                            ...user, password: e.target.value
                        })}
                    type="password"
                    placeholder={"password"}
                />
            </div>
            <p className={cl.validationMsg}>
                {validation}
            </p>
            <ActBtn action={handleSubmit} label={'save'}/>
        </div>

    );
};

export default UserForm;