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
import CarForm from "../../components/Car/CarForm";

const UserProfile = () => {
    const {store} = useContext(Context);
    const [user, setUser] = useState({})
    const [cars, setCars] = useState([]);
    const [reservations, setReservations] = useState([]);

    const [showCars, setShowCars] = useState(false);
    const [showReservations, setShowReservations] = useState(false);

    const [message, setMessage] = useState('');

    const [reservationData, setReservationData] = useState({});

    const [modalMessage, setModalMessage] = useState(false);
    const [modalReservationInfo, setModalReservationInfo] = useState(false);
    const [modalCreateCar, setModalCreateCar] = useState(false);
    const [modalUpdateCar, setModalUpdateCar] = useState(false);

    const [validationMessage, setValidationMessage] = useState('');

    const openModalCreateCar = () => setModalCreateCar(true);
    const toggleCars = () => setShowCars(!showCars);
    const toggleReservations = () => setShowReservations(!showReservations);
    const clearValidationMsg = () => setValidationMessage('');

    const [fetchUser] = useFetching(async (id) => {
        setUser((await UserService.getById(id)).data);
    });

    const [fetchCars] = useFetching(async (id) => {
        setCars((await CarService.getByUserId(id)).data);
    });

    const [fetchReservations] = useFetching(async (id) => {
        setReservations((await ReservationService.getByUserId(id)).data);
    });

    const [deleteCar] = useFetching(async (id) => {
        try {
            await CarService.deleteCarById(id);
            setCars(prevCars => prevCars.filter(car => car.id !== id));
            setMessage("Car successfully deleted!")
            setModalMessage(true)
        } catch (e) {
            setModalMessage(true)
            setMessage(e.response.data.message)
        }
    })

    const [createCar] = useFetching(async (carData) => {
        try {
            const response = await CarService.create(user.id, carData);
            setModalCreateCar(false);
            setMessage("Car successfully created!")
            setModalMessage(true)
            const newCar = response.data;
            setCars((prevCars) => [...prevCars, newCar]);
        } catch (error) {
            const errorMessage =
                error.response.data.errors.number || error.response.data.message
            setValidationMessage(errorMessage);
        }
    });

    const [updateCar] = useFetching(async (carData) => {
        try {
            const response = await CarService.update(carData)
            setModalUpdateCar(false);
            setMessage("Car successfully updated!")
            setModalMessage(true)
            const updatedCar = response.data;
            setCars((prevCars) => {
                return prevCars.map((car) => (
                    car.id === updatedCar.id
                        ? updatedCar
                        : car
                ));
            });
            setValidationMessage('')
        } catch (error) {
            const errorMessage =
                error.response.data?.errors?.number || error.response.data?.message
            setValidationMessage(errorMessage);
        }
    });

    const [cancelReservation] = useFetching(async (id) => {
        try {
            const response = await ReservationService.cancel(id);
            setMessage("Reservation successfully canceled!")
            setModalMessage(true)
            setReservations((prevReservations) => {
                return prevReservations.map((reservation) => {
                    return reservation.id === id
                        ? {...reservation, status: response.data.status}
                        : reservation
                })
            })
        } catch (error) {
            setModalMessage(true)
            setMessage(error.response.data.message)
        }
    })

    const reservationInfo = (reservation) => {
        setModalReservationInfo(true);
        setReservationData(reservation)
    }

    useEffect(() => {
        fetchUser(store.user.id)
        if (showCars) {
            fetchCars(user.id)
        }
        if (showReservations) {
            fetchReservations(user.id)
        }
    }, [showCars, showReservations])


    return (
        <div className="App">
            <div className={cl.profileHeader}>Profile</div>
            <Modal visible={modalMessage}
                   setVisible={setModalMessage}>
                {message}
            </Modal>
            <Modal visible={modalReservationInfo}
                   setVisible={setModalReservationInfo}>
                <ReservationInfo reservation={reservationData}/>
            </Modal>
            <Modal visible={modalCreateCar}
                   setVisible={setModalCreateCar}
                   onClose={clearValidationMsg}>
                <CarForm onSubmit={createCar}
                         validation={validationMessage}/>
            </Modal>
            <hr className={cl.hrLine}/>
            <div className={cl.profileContainer}>
                <div className={cl.userInfo}>
                    <p>
                        <span className={cl.propName}>name:</span>
                        {user.name}
                    </p>
                    <p>
                        <span className={cl.propName}>email:</span>
                        {user.email}
                    </p>
                    <ActBtn label="edit"/>
                </div>
                <div className={cl.userProps}>
                    <div className={cl.userCars}>
                        <p className={cl.propName} onClick={toggleCars}>
                            cars
                        </p>
                        <ActBtn label="add" action={openModalCreateCar}/>
                        <div className="slide-container">
                            <TransitionGroup>
                                {showCars && (
                                    <CSSTransition classNames="slide"
                                                   timeout={300}>
                                        <CarsTable
                                            cars={cars}
                                            onDelete={deleteCar}
                                            onUpdate={updateCar}
                                            validationMsg={validationMessage}
                                            onModalClose={clearValidationMsg}
                                        />
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </div>
                    </div>

                    <div className={cl.userReservations}>
                        <p className={cl.propName} onClick={toggleReservations}>
                            reservations
                        </p>
                        <ActBtn label="create"/>
                        <div className="slide-container">
                            <TransitionGroup>
                                {showReservations && (
                                    <CSSTransition classNames="slide"
                                                   timeout={300}>
                                        <ReservationsTable
                                            reservations={reservations}
                                            reservationInfo={reservationInfo}
                                            onCancel={cancelReservation}
                                        />
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