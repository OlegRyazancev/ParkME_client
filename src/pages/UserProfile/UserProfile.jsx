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
import Modal from "../../components/UI/Modal/Modal";
import ReservationInfo from "../../components/Reservation/ReservationInfo";

const UserProfile = () => {
    const {store} = useContext(Context);
    const [user, setUser] = useState({})
    const [cars, setCars] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showCars, setShowCars] = useState(false);
    const [showReservations, setShowReservations] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalReservationInfo, setModalReservationInfo] = useState(false);
    const [error, setError] = useState('');
    const [reservationData, setReservationData] = useState({});

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

    const [deleteCar] = useFetching(async (id) => {
        try {
            await CarService.deleteCarById(id);
        } catch (e) {
            console.log(e)
            setModalError(true)
            setError(e.response.data.message)
        }
    })

    const reservationInfo = (reservation) => {
        setModalReservationInfo(true);
        setReservationData(reservation)
    }


    useEffect(() => {
        fetchUser(store.user.id)
        if (showCars) {
            fetchCars(store.user.id)
        }
        if (showReservations) {
            fetchReservations(store.user.id)
        }

    }, [showCars, showReservations])


    return (
        <div className="App">
            <div className={cl.profileHeader}>Profile</div>
            <Modal visible={modalError}
                   setVisible={setModalError}>
                {error}
            </Modal>
            <Modal visible={modalReservationInfo}
                   setVisible={setModalReservationInfo}>
                <ReservationInfo reservation={reservationData}/>
            </Modal>
            <hr className={cl.hrLine}/>
            <div className={cl.profileContainer}>
                <div className={cl.userInfo}>
                    <p><span className={cl.propName}>name:</span> {user.name}</p>
                    <p><span className={cl.propName}>email:</span> {user.email}</p>
                    <ActBtn label="edit"/>
                </div>
                <div className={cl.userProps}>
                    <div className={cl.userCars}>
                        <p className={cl.propName} onClick={toggleCars}>cars<ActBtn label="add"/></p>
                        <div className="slide-container">
                            <TransitionGroup>
                                {showCars && (
                                    <CSSTransition classNames="slide"
                                                   timeout={300}>
                                        <CarsTable cars={cars}
                                                   onDelete={deleteCar}/>
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </div>
                    </div>
                    <div className={cl.userReservations}>
                        <p className={cl.propName} onClick={toggleReservations}>reservations<ActBtn
                            label="create"/>
                        </p>
                        <div className="slide-container">
                            <TransitionGroup>
                                {showReservations && (
                                    <CSSTransition classNames="slide"
                                                   timeout={300}>
                                        <ReservationsTable reservations={reservations}
                                                           reservationInfo={reservationInfo}/>
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