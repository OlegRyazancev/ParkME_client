import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const RegistrationForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Name'
            />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Password'
            />
            <input
                onChange={e => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                type="password"
                placeholder='Confirm password'
            />
            <button onClick={() => store.registration(name, email, password, passwordConfirmation)}>
                Register
            </button>
        </div>
    );
};




export default observer(RegistrationForm);