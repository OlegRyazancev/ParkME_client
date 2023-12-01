import './styles/App.css';
import React, {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Loader from "./components/UI/Loader/Loader";

function App() {

    const {store} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (localStorage.getItem('accessToken')) {
                    await store.checkAuth();
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [store]);


    if (isLoading) {
        return <Loader/>
    }

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default observer(App);
