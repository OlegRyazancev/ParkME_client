import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {useFetching} from "../../hooks/useFetching";
import CarService from "../../service/CarService";
import {observer} from "mobx-react-lite";
import ReservationService from "../../service/ReservationService";
import cl from "./UserProfile.module.css"
import UserService from "../../service/UserService";
import ReservationsTable from "../../components/Reservation/ReservationsTable";
import CarsTable from "../../components/Car/CarsTable";
import ActBtn from "../../components/UI/Button/ActBtn"
import {CSSTransition, TransitionGroup} from "react-transition-group";

const UserProfile = () => {
    const {store} = useContext(Context);
    const [user, setUser] = useState({})
    const [cars, setCars] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showCars, setShowCars] = useState(false);
    const [showReservations, setShowReservations] = useState(false);

    const toggleCars = () => {
        setShowCars(!showCars);
    }
    const toggleReservations = () => {
        setShowReservations(!showReservations);
    }

    const [fetchUser] = useFetching(async (id) => {
        const response = await UserService.getById(id);
        setUser(response.data)
    })

    const [fetchCars] = useFetching(async (id) => {
        const response = await CarService.getByUserId(id);
        setCars(response.data);
    })

    const [fetchReservations] = useFetching(async (id) => {
        const response = await ReservationService.getByUserId(id);
        setReservations(response.data);
    })

    useEffect(() => {
        fetchUser(store.user.id)
        if (showCars) {
            fetchCars(store.user.id)
        }
        if (showReservations) {
            fetchReservations(store.user.id)
        }

    }, [showCars, showReservations]);


    return (
        <div className="App">
            <div className={cl.profileHeader}>Profile</div>
            <hr className={cl.hrLine}/>
            <div className={cl.profileContainer}>
                <div className={cl.userInfo}>
                    <p><span className={cl.propName}>name:</span> {user.name}</p>
                    <p><span className={cl.propName}>email:</span> {user.email}</p>
                    <ActBtn label="edit"/>

                </div>
                <div className={cl.userProps}>
                    <div className={cl.userCars}>
                        <p className={cl.propName} onClick={toggleCars}>cars <ActBtn label="add"/> </p>
                        <div className="slide-container">
                            <TransitionGroup>
                            {showCars && (
                                <CSSTransition classNames="slide" timeout={300}>
                                    <CarsTable cars={cars} />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                        </div>
                    </div>
                    <div className={cl.userReservations}>
                        <p className={cl.propName} onClick={toggleReservations}>reservations <ActBtn label="create"/></p>
                        <div className="slide-container">
                            <TransitionGroup>
                                {showReservations && (
                                    <CSSTransition classNames="slide" timeout={300}>
                                        <ReservationsTable reservations={reservations} />
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default observer(UserProfile);