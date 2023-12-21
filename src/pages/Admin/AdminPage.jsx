import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import AdminService from "../../service/AdminService";
import cl from "./AdminPage.module.css";
import ZoneService from "../../service/ZoneService";
import CarService from "../../service/CarService";
import UserService from "../../service/UserService";
import ReservationService from "../../service/ReservationService";
import Modal from "../../components/UI/Modal/Modal";
import ZoneForm from "../../components/Zone/ZoneForm";
import PlaceForm from "../../components/Place/PlaceForm";
import AdminZonesTable from "../../components/Admin/AdminZonesTable";
import AdminUsersTable from "../../components/Admin/AdminUsersTable";
import AdminCarsTable from "../../components/Admin/AdminCarsTable";
import AdminReservationsTable
    from "../../components/Admin/AdminReservationsTable";
import Loader from "../../components/UI/Loader/Loader";
import PageHeader from "../../components/UI/PageHeader/PageHeader";

const AdminPage = () => {

    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [zones, setZones] = useState([]);

    const [selectedZoneId, setSelectedZoneId] = useState(null);

    const [message, setMessage] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const [modalMessage, setModalMessage] = useState(false);

    const [modalCreateZone, setModalCreateZone] = useState(false);
    const [modalUpdateZone, setModalUpdateZone] = useState(false);

    const [modalCreatePlaces, setModalCreatePlaces] = useState(false);


    const openModalCreateZone = () => setModalCreateZone(true);
    const openModalCreatePlaces = (zoneId) => {
        setSelectedZoneId(zoneId);
        setModalCreatePlaces(true);
    }

    const openModalUpdateZone = (zoneId) => {
        setSelectedZoneId(zoneId);
        setModalUpdateZone(true);
    }
    const clearValidationMessage = () => setValidationMessage('');

    const [deleteCar] = useFetching(async (id) => {
        try {
            await CarService.deleteCarById(id);
            setCars(prevCars => prevCars.filter(car => car.id !== id));
            setMessage("Car successfully deleted!");
            setModalMessage(true);
        } catch (e) {
            setModalMessage(true);
            setMessage(e.response.data.message);
        }
    })

    const [deleteUser] = useFetching(async (id) => {
        try {
            await UserService.delete(id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            setMessage("User successfully deleted with all dependencies!");
            setModalMessage(true);
        } catch (e) {
            setMessage(e.response.data.message);
            setModalMessage(true);
        }
    });

    const [deleteReservation] = useFetching(async (id) => {
        try {
            await ReservationService.delete(id);
            setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== id));
            setMessage("Reservation successfully deleted!");
            setModalMessage(true);
        } catch (e) {
            setMessage(e.response.data.message);
            setModalMessage(true);
        }
    });

    const [deleteZone] = useFetching(async (id) => {
        try {
            await AdminService.deleteZoneWithPlaces(id);
            setZones(prevZones => prevZones.filter(zone => zone.id !== id));
            setMessage("Zones with all places successfully deleted!");
            setModalMessage(true);
        } catch (e) {
            setMessage(e.response.data.message);
            setModalMessage(true);
        }
    });

    const [createZone] = useFetching(async (zoneData) => {
        try {
            const response = await AdminService.createZone(zoneData);
            setModalCreateZone(false);
            setMessage("Zone successfully created!")
            setModalMessage(true);
            const newZone = response.data;
            setZones((prevZones => [...prevZones, newZone]));
            setValidationMessage('');
        } catch (error) {
            const errorMessage =
                error.response.data?.errors?.number || error.response?.data?.message;
            setValidationMessage(errorMessage);
        }
    });

    const [updateZone] = useFetching(async (zoneData) => {
        try {
            const response = await AdminService.updateZone(zoneData);
            setModalUpdateZone(false);
            setMessage("Zone successfully updated!");
            setModalMessage(true);
            const updatedZone = response.data;
            setZones((prevZones) => {
                return prevZones.map((zone) => (
                    zone.id === updatedZone.id
                        ? updatedZone
                        : zone
                ));
            });
            setValidationMessage('');
        } catch (error) {
            const errorMessage =
                error.response.data?.errors?.number || error.response?.data?.message;
            setValidationMessage(errorMessage);
        }
    });

    const [createPlaces] = useFetching(async (countPlaces) => {
        try {
            await AdminService.createPlacesInZone(selectedZoneId, countPlaces);
            setModalCreatePlaces(false);
            setMessage("Places successfully created! Please reload the page");
            setModalMessage(true);
            setValidationMessage('');
        } catch (error) {
            const errorMessage = error.response.data?.message;
            setValidationMessage(errorMessage);
        }
    })

    const [fetchUsers, isUsersLoading] = useFetching(async () => {
        const response = await AdminService.getAllUsers();
        setUsers([...users, ...response.data]);
    });

    const [fetchReservations, isReservationsLoading] = useFetching(async () => {
        const response = await AdminService.getAllReservations();
        setReservations([...reservations, ...response.data,]);
    });

    const [fetchCars, isCarsLoading] = useFetching(async () => {
        const response = await AdminService.getAllCars();
        setCars([...cars, ...response.data]);
    });

    const [fetchZones, isZonesLoading] = useFetching(async () => {
        const response = await ZoneService.getAll();
        setZones([...zones, ...response.data]);
    })

    useEffect(() => {
        fetchUsers();
        fetchCars();
        fetchReservations();
        fetchZones();
    }, []);

    return (
        <div className="App">
            <PageHeader value={"Admin page"}/>
            <div className={cl.adminContainer}>
                <div className={cl.innerContainer}>

                    {isUsersLoading && <Loader/>}
                    <AdminUsersTable
                        users={users}
                        onDelete={deleteUser}
                    />

                    {isCarsLoading && <Loader/>}
                    <AdminCarsTable
                        cars={cars}
                        onDelete={deleteCar}
                    />
                </div>
                <div className={cl.innerContainer}>

                    {isReservationsLoading && <Loader/>}
                    <AdminReservationsTable
                        reservations={reservations}
                        onDelete={deleteReservation}
                    />

                    {isZonesLoading && <Loader/>}
                    <AdminZonesTable
                        zones={zones}
                        onCreatePlaces={openModalCreatePlaces}
                        onUpdateZone={openModalUpdateZone}
                        onCreateZone={openModalCreateZone}
                        onDelete={deleteZone}
                    />
                </div>

                <Modal
                    visible={modalMessage}
                    setVisible={setModalMessage}>
                    {message}
                </Modal>

                <Modal
                    visible={modalCreatePlaces}
                    setVisible={setModalCreatePlaces}
                    onClose={clearValidationMessage}>
                    <PlaceForm
                        create={createPlaces}
                        validation={validationMessage}
                    />
                </Modal>

                <Modal
                    visible={modalCreateZone}
                    setVisible={setModalCreateZone}
                    onClose={clearValidationMessage}>
                    <ZoneForm
                        action={createZone}
                        validation={validationMessage}
                        zoneId={null}
                    />
                </Modal>

                <Modal
                    visible={modalUpdateZone}
                    setVisible={setModalUpdateZone}
                    onClose={clearValidationMessage}>
                    <ZoneForm
                        action={updateZone}
                        validation={validationMessage}
                        zoneId={selectedZoneId}
                    />
                </Modal>
            </div>
        </div>
    );
};


export default AdminPage;