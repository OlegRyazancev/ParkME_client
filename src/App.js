import './styles/App.css';
import React, {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
        }
    }, [])



    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default observer(App);
