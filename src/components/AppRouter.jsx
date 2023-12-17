import React, {useContext} from 'react';
import {privateRoutes, publicRoutes, adminRoutes} from "../router/routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {store} = useContext(Context)

    return (
        store.isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )}
                {store.user.roles.includes('ROLE_ADMIN')
                    &&
                    adminRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={route.element}
                            key={route.path}
                        />
                    )}
                <Route path="*" element={<Navigate to="/welcome"/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
    );
};

export default observer(AppRouter);