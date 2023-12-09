import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";
import cl from "./User.module.css"
import {observer} from "mobx-react-lite";

const UserForm = ({onSubmit, user, validation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleSubmit = () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            setValidationMessage('Please fill in all fields');
            return;
        }
        const userData = {
            id: user.id,
            name: name,
            email: email,
            password: password
        }
        onSubmit(userData)
        setName('');
        setEmail('');
        setPassword('');
        setValidationMessage('')
    }

    return (
        <div className={cl.formContainer}>
            <p className={cl.formHeader}>Edit user</p>
            <div className={cl.inputContainer}>
                <span>Enter old / new name: </span>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    placeholder={"Name"}
                />
            </div>
            <div className={cl.inputContainer}>
                <span>Enter old / new email: </span>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                    placeholder={"email@example.com"}
                />
            </div>
            <div className={cl.inputContainer}>
                <span>Enter old / new password: </span>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    placeholder={"password"}
                />
            </div>
            <p className={cl.validationMsg}>
                {validationMessage
                    ? validationMessage
                    : validation}
            </p>
            <ActBtn action={handleSubmit} label={'save'}/>
        </div>

    );
};

export default observer(UserForm);