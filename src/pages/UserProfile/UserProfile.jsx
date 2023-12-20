import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CarService from "../../service/CarService";
import ReservationService from "../../service/ReservationService";
import cl from "./UserProfile.module.css"
import UserService from "../../service/UserService";
import Modal from "../../components/UI/Modal/Modal";
import CarForm from "../../components/Car/CarForm";
import {useNavigate, useParams} from "react-router-dom";
import UserForm from "../../components/User/UserForm";
import {useReservations} from "../../hooks/useReservations";
import ReservationsFilter
    from "../../components/Reservation/ReservationsFilter";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import ReservationForm from "../../components/Reservation/ReservationForm";

const UserProfile = () => {

    const params = useParams();

    const [user, setUser] = useState({})
    const [cars, setCars] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState({sort: ''});

    const [selectedCar, setSelectedCar] = useState({});
    const [selectedReservation, setSelectedReservation] = useState({});

    const [message, setMessage] = useState('');

    const [modalMessage, setModalMessage] = useState(false);
    const [modalCreateCar, setModalCreateCar] = useState(false);
    const [modalUpdateCar, setModalUpdateCar] = useState(false);
    const [modalUpdateUser, setModalUpdateUser] = useState(false);
    const [modalUpdateReservation, setModalUpdateReservation] = useState(false);

    const [validationMessage, setValidationMessage] = useState('');

    const navigate = useNavigate();
    const openModalCreateCar = () => setModalCreateCar(true);
    const openModalUpdateCar = (car) => {
        setSelectedCar(car)
        setModalUpdateCar(true);
    }
    const openModalUpdateReservation = (reservation) => {
        setSelectedReservation(reservation);
        setModalUpdateReservation(true);
    }
    const openModalUpdateUser = () => setModalUpdateUser(true);
    const clearValidationMsg = () => setValidationMessage('');

    const sortedReservations = useReservations(reservations, filter.sort);
    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return '#135d13';
            case 'CANCELED':
                return '#7c2020';
            case 'PLANNED':
                return '#917321'
            case 'COMPLETED':
                return '#187777';
            default:
                return 'white';
        }
    };


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
            setMessage(e.response.data.message)
            setModalMessage(true)
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

    const [updateReservation] = useFetching(async (reservationData) => {
        try {
            await ReservationService.update(reservationData);
            setModalUpdateReservation(false);
            setMessage("Reservation successfully updated! Please reload the page");
            setModalMessage(true);
            setValidationMessage('');
        } catch (error) {
            const errorMessage =
                error.response.data?.errors?.timeFrom || error.response.data?.message
            setValidationMessage(errorMessage);
        }
    })

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
            console.log(userData)
            await UserService.update(userData);
            setModalUpdateUser(false);
            setMessage("User successfully updated! Please reload the page");
            setModalMessage(true);
        } catch (error) {
            console.log(error.response)
            const errorMessage =
                error.response.data?.errors?.email
                || error.response.data?.message
                || error.response.data?.errors?.name
                || error.response.data?.errors?.password
                || error.response.data?.errors
            setValidationMessage(errorMessage);
        }
    })

    useEffect(() => {
        fetchCars(params.id);
        fetchUser(params.id);
        fetchReservations(params.id);
    }, [params.id]);

    return (
        <div className="App">
            <Modal
                visible={modalMessage}
                setVisible={setModalMessage}>
                {message}
            </Modal>
            <Modal
                visible={modalCreateCar}
                setVisible={setModalCreateCar}
                onClose={clearValidationMsg}>
                <CarForm
                    action={createCar}
                    validation={validationMessage}
                    selectedCar={null}
                />
            </Modal>
            <Modal
                visible={modalUpdateCar}
                setVisible={setModalUpdateCar}
                onClose={clearValidationMsg}>
                <CarForm
                    action={updateCar}
                    validation={validationMessage}
                    selectedCar={selectedCar}
                />
            </Modal>
            <Modal
                visible={modalUpdateUser}
                setVisible={setModalUpdateUser}
                onClose={clearValidationMsg}>
                <UserForm
                    action={updateUser}
                    validation={validationMessage}
                    userId={params.id}
                />
            </Modal>
            <Modal
                visible={modalUpdateReservation}
                setVisible={setModalUpdateReservation}
                onClose={clearValidationMsg}>
                <ReservationForm
                    onSubmit={updateReservation}
                    validation={validationMessage}
                    reservation={selectedReservation}
                />
            </Modal>
            <PageHeader value={"Profile"}/>
            <div className={cl.profileContainer}>
                <div className={cl.leftContainer}>
                    <div className={cl.leftPropsContainer}>
                        <p className={cl.propHeader}>User Info</p>
                        <p>
                            <span className={cl.propName}>
                                name:
                            </span>
                            {user.name}
                        </p>
                        <p>
                            <span className={cl.propName}>
                                email:
                            </span>
                            {user.email}
                        </p>
                    </div>
                    <button onClick={openModalUpdateUser}>Edit</button>
                    <div className={cl.leftPropsContainer}>
                        <p className={cl.propHeader}>Cars</p>
                        {cars.map((car) => (
                            <div key={car.id} className={cl.carsContainer}>
                                <div className={cl.carItem}>
                                    <p>
                                        <span className={cl.propName}>
                                            number:
                                        </span>
                                        {car.number}
                                    </p>
                                    <p>
                                        <span
                                            className={cl.propName}>type:
                                        </span>
                                        {car.type}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => openModalUpdateCar(car)}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteCar(car.id)}>
                                        Delete
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
                        <div>
                            <ReservationsFilter
                                filter={filter}
                                setFilter={setFilter}
                            />
                            <table>
                                <thead>
                                <tr>
                                    <th>Time From</th>
                                    <th>Time To</th>
                                    <th>Zone</th>
                                    <th>Place</th>
                                    <th>Car</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedReservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{reservation.timeFrom}</td>
                                        <td>{reservation.timeTo}</td>
                                        <td>{reservation.zone?.number}</td>
                                        <td>{reservation.place?.number}</td>
                                        <td>{reservation.car?.number}</td>
                                        <td style={{color: getStatusColor(reservation.status)}}>
                                            {reservation.status}
                                        </td>
                                        {(reservation.status === 'ACTIVE' || reservation.status === 'PLANNED')
                                            ?
                                            <>
                                                <td>
                                                    <button
                                                        onClick={() => openModalUpdateReservation(reservation)}>
                                                        Edit
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => cancelReservation(reservation.id)}>
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                            :
                                            <>
                                                <td></td>
                                                <td></td>
                                            </>
                                        }
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;