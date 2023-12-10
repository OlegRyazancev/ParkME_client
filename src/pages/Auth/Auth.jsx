import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import cl from "./Auth.module.css";
import authLogo from "../../images/auth_logo.png";
import appLogo from "../../images/app_logo.png";
import {Context} from "../../index";

const Auth = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {store} = useContext(Context);

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setName('');
        setUsername('');
        setPassword('');
        setPasswordConfirmation('');
        setErrorMessage('')
    };

    const isValidRegistration = () => {
        const requiredFields = isSignUp ? [name, username, password, passwordConfirmation] : [username, password];
        if (requiredFields.some(field => !field)) {
            setErrorMessage('Please fill in all fields');
            return false;
        }
        return true;
    };

    const handleRegistration = async () => {
        if (isSignUp && isValidRegistration()) {
            try {
                await store.registration(name, username, password, passwordConfirmation);
                setErrorMessage('');
                setIsSignUp(!isSignUp);
            } catch (error) {
                const errorMessage = error.response.data.errors?.email || error.response.data.message;
                setErrorMessage(errorMessage);
            }
        }
    };

    const handleLogin = async () => {
        try {
            if (!isValidRegistration()) return;
            await store.login(username, password);
        } catch (error) {
            const errorMessage = error.response.data.errors || error.response.data.message;
            setErrorMessage(errorMessage);
        }
    };

    const renderNameInput = () => isSignUp && (
        <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
        />
    );

    const renderPasswordConfirmationInput = () => isSignUp && (
        <input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm password"
        />
    );

    return (
        <div className="App">


            <div className={cl.authContainer}>
                <div className={cl.authForm}>
                    <h1 className={cl.authFormHeader}>{isSignUp ? "Sign up" : "Sign in"}</h1>
                    {renderNameInput()}
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                    {renderPasswordConfirmationInput()}
                    <p style={{color: "#f65f5f"}}>{errorMessage}</p>
                    <button className={cl.signBtn}
                            onClick={isSignUp ? handleRegistration : handleLogin}>
                        {isSignUp ? "Sign up" : "Sign in"}
                    </button>
                    <div className={cl.authLink}>
                        <p>{isSignUp ? "Already have an account?" : "Don't have an account?"} </p>
                        <button className={cl.lnk} onClick={toggleMode}>
                            {isSignUp ? "Sign in" : "Sign up"}
                        </button>
                    </div>
                </div>

                <div className={cl.welcomeInfo}>
                    <p className={cl.welcomeHeader}>Welcome to</p>
                    <img src={appLogo} alt="auth_logo"
                         style={{backgroundColor: "transparent"}}/>
                    <p className={cl.welcomeDesc}>Say goodbye to the stress of
                        finding a spot with our intuitive reservation
                        system</p>
                    <p className={cl.welcomeDesc}>Start your journey with ParkMe
                        and make parking a breeze!</p>
                    <img src={authLogo} alt="auth_logo" className={cl.img}/>
                </div>
            </div>
        </div>
    );
};

export default observer(Auth);
