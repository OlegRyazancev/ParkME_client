import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {useFetching} from "../../hooks/useFetching";
import CarService from "../../service/CarService";
import ReservationService from "../../service/ReservationService";
import cl from "./UserProfile.module.css"
import UserService from "../../service/UserService";
import Modal from "../../components/UI/Modal/Modal";
import CarForm from "../../components/Car/CarForm";
import {useNavigate} from "react-router-dom";
import UserForm from "../../components/User/UserForm";
import {useReservations} from "../../hooks/useReservations";
import ReservationsFilter
    from "../../components/Reservation/ReservationsFilter";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import ReservationsTable from "../../components/Reservation/ReservationsTable";


const UserProfile = () => {
    const {store} = useContext(Context);
    const [user, setUser] = useState({})
    const [cars, setCars] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState({sort: ''});

    const [message, setMessage] = useState('');

    const [modalMessage, setModalMessage] = useState(false);

    // const [modalUpdateReservation, setModalUpdateReservation] = useState(false);
    const [modalCreateCar, setModalCreateCar] = useState(false);
    const [modalUpdateCar, setModalUpdateCar] = useState(false);
    const [modalUpdateUser, setModalUpdateUser] = useState(false);

    const [validationMessage, setValidationMessage] = useState('');

    const navigate = useNavigate();
    const openModalCreateCar = () => setModalCreateCar(true);
    const openModalUpdateCar = () => setModalUpdateCar(true);
    const openModalUpdateUser = () => setModalUpdateUser(true);
    const clearValidationMsg = () => setValidationMessage('');

    const sortedReservations = useReservations(reservations, filter.sort);

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
            setValidationMessage('');
        } catch (error) {
            const errorMessage =
                error.response.data?.errors?.number || error.response?.data?.message;
            setValidationMessage(errorMessage);
        }
    });

    const [updateCar] = useFetching(async (carData) => {
        try {
            const response = await CarService.update(carData);
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
            setValidationMessage('');
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

    const [updateUser] = useFetching(async (userData) => {
        try {
            console.log(store.user)
            console.log(userData)
            await UserService.update(
                userData.id,
                userData.name,
                userData.email,
                userData.password
            );
            setModalUpdateUser(false);
            setMessage("User successfully updated! Please reload the page");
            setModalMessage(true);
            console.log(store.user.name)
        } catch (error) {
            const errorMessage =
                error.response.data?.errors?.email
                || error.response.data?.message
                || error.response.data?.errors?.name
                || error.response.data?.errors?.password
            setValidationMessage(errorMessage);
            console.log(error)
            console.log(error.data)
        }
    })

    useEffect(() => {
        fetchUser(store.user.id)
        fetchCars(store.user.id)
        fetchReservations(store.user.id)
    }, []);

    return (
        <div className="App">
            <Modal visible={modalMessage}
                   setVisible={setModalMessage}>
                {message}
            </Modal>
            <Modal visible={modalCreateCar}
                   setVisible={setModalCreateCar}
                   onClose={clearValidationMsg}>
                <CarForm onSubmit={createCar}
                         validation={validationMessage}
                />
            </Modal>
            <Modal visible={modalUpdateCar}
                   setVisible={setModalUpdateCar}
                   onClose={clearValidationMsg}>
                <CarForm onSubmit={updateCar}
                         validation={validationMessage}
                />
            </Modal>
            <Modal visible={modalUpdateUser}
                   setVisible={setModalUpdateUser}
                   onClose={clearValidationMsg}>
                <UserForm onSubmit={updateUser}
                          user={store.user}
                          validation={validationMessage}
                />
            </Modal>
            <PageHeader value={"Profile"}/>
            <div className={cl.profileContainer}>
                <div className={cl.leftContainer}>
                    <div className={cl.leftPropsContainer}>
                        <p className={cl.propHeader}>User Info</p>
                        <p>
                            <span
                                className={cl.propName}>name: </span> {user.name}
                        </p>
                        <p>
                            <span
                                className={cl.propName}>email: </span> {user.email}
                        </p>
                    </div>
                    <button onClick={openModalUpdateUser}>Edit</button>
                    <div className={cl.leftPropsContainer}>
                        <p className={cl.propHeader}>Cars</p>
                        {cars.map((car) => (
                            <div key={car.id} className={cl.carsContainer}>
                                <div className={cl.carItem}>
                                    <p>
                                        <span
                                            className={cl.propName}>number: </span>
                                        {car.number}
                                    </p>
                                    <p>
                                        <span
                                            className={cl.propName}>type: </span>
                                        {car.type}
                                    </p>
                                </div>
                                <div>
                                    <button onClick={openModalUpdateCar}>Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCar(car.id)}>Delete
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                    <button onClick={openModalCreateCar}>
                        Add
                    </button>
                </div>
                <div className={cl.rightContainer}>
                    <div className={cl.createResContainer}>
                        <span>Add new reservation: </span>
                        <button onClick={() => navigate('/new-reservation')}>
                            Create
                        </button>
                    </div>
                    <div className={cl.reservationsContainer}>
                        <p className={cl.propHeader}>Reservations</p>
                        <ReservationsTable
                            reservations={sortedReservations}
                            onCancel={cancelReservation}
                            filter={
                                <ReservationsFilter
                                    filter={filter}
                                    setFilter={setFilter}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;