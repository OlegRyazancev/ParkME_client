import React, {useEffect, useState, useMemo, useContext} from 'react';
import ZoneService from '../../service/ZoneService';
import {useFetching} from '../../hooks/useFetching';
import CarService from "../../service/CarService";
import {Context} from "../../index";
import ActBtn from "../../components/UI/Button/ActBtn";
import ReservationService from "../../service/ReservationService";
import Modal from "../../components/UI/Modal/Modal";
import {format} from "date-fns";
import DateTimePicker from "../../components/UI/DateTimePicker/DateTimePicker";
import Select from "../../components/UI/Select/Select";


const NewReservation = () => {
    const [zones, setZones] = useState([]);
    const [places, setPlaces] = useState([]);
    const [cars, setCars] = useState([]);

    const [selectedTimeFrom, setSelectedTimeFrom] = useState('');
    const [selectedTimeTo, setSelectedTimeTo] = useState('');
    const [selectedZone, setSelectedZone] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [selectedCar, setSelectedCar] = useState({});

    const [isPlaceSelectDisabled, setIsPlaceSelectDisabled] = useState(true);

    const [modalMessage, setModalMessage] = useState('');
    const [message, setMessage] = useState('');
    const [validation, setValidation] = useState('');

    const {store} = useContext(Context);

    const [fetchZones] = useFetching(async () => {
        try {
            const response = await ZoneService.getAll();
            setZones(response.data);
        } catch (error) {
            console.error('Error fetching zones:', error);
        }
    });

    const [fetchPlacesByZoneId] = useFetching(async (zoneId) => {
        try {
            const response = await ZoneService.getById(zoneId);
            setPlaces(response.data?.places);
        } catch (error) {
            console.error('Error fetching places by zone ID:', error);
        }
    });

    const [fetchCarsByUserId] = useFetching(async (userId) => {
        try {
            const response = await CarService.getByUserId(userId);
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching car by userId', error);
        }
    })

    const [createReservation] = useFetching(async (reservationData) => {
        try {
            await ReservationService.create(reservationData, store.user.id);
            setMessage("Reservation successfully created!");
            setModalMessage(true);
        } catch (error) {
            const errorMessage =
                error.response.data.message;
            setValidation(errorMessage);
        }
    })

    useEffect(() => {
        fetchZones();
        fetchCarsByUserId(store.user.id);
    }, []);

    useEffect(() => {
        setIsPlaceSelectDisabled(!selectedZone || !selectedZone.id);
    }, [selectedZone]);


    const zoneOptions = useMemo(() => (
        <>
            <option value="">Select Zone:</option>
            {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                    {zone.number}
                </option>
            ))}
        </>
    ), [zones]);

    const placeOptions = useMemo(() => (
        <>
            <option value="">Select Place:</option>
            {places.map((place) => (
                <option key={place.id} value={place.id}>
                    {place.number} - {place.status}
                </option>
            ))}
        </>
    ), [places]);

    const carsOptions = useMemo(() => (
        <>
            <option value="">Select Car:</option>
            {cars.map((car) => (
                <option key={car.id} value={car.id}>
                    {car.number}
                </option>
            ))}
        </>
    ), [cars]);

    const handleZoneChange = async (zoneId) => {
        try {
            const zoneIdLong = parseInt(zoneId, 10);

            const selectedZone = zones.find((zone) => zone.id === zoneIdLong);
            setSelectedZone(selectedZone);

            if (selectedZone) {
                await fetchPlacesByZoneId(selectedZone.id);
            } else {
                setPlaces([]);
            }
        } catch (error) {
            console.error('Error handling zone change:', error);
        }
    };

    const handlePlaceChange = (placeId) => {
        const parsedPlaceId = parseInt(placeId, 10);
        const selectedPlace = places.find((place) => place.id === parsedPlaceId);
        setSelectedPlace(selectedPlace);
    };
    const handleCarChange = (carId) => {
        const parsedCarId = parseInt(carId, 10);
        const selectedCar = cars.find((car) => car.id === parsedCarId);
        setSelectedCar(selectedCar);
    }
    const handleTimeFrom = (data) => {
        const selectedDateTime = new Date(data);
        if (selectedDateTime >= Date.now()) {
            const formattedTimeFrom =
                format(selectedDateTime, 'yyyy-MM-dd HH:mm')
            setSelectedTimeFrom(formattedTimeFrom);
        } else {
            setValidation('Time from must be after or equal ' +
                'to the current time');
            setSelectedTimeFrom('');
        }

    }
    const handleTimeTo = (data) => {
        const selectedDateTime = new Date(data);
        if (selectedDateTime >= Date.now()) {
            const formattedTimeTo =
                format(selectedDateTime, 'yyyy-MM-dd HH:mm');
            setSelectedTimeTo(formattedTimeTo);
        } else {
            setValidation('Time to must be after or equal ' +
                'to the current time');
            setSelectedTimeFrom('');
        }
    }

    const handleSubmit = () => {
        console.log(selectedCar?.number)
        const reservationData = {
            timeFrom: selectedTimeFrom,
            timeTo: selectedTimeTo,
            zone: {number: selectedZone?.number},
            place: {number: selectedPlace?.number},
            car: {number: selectedCar?.number},
        };

        createReservation(reservationData);
    };

    return (
        <div>
            <Modal visible={modalMessage}
                   setVisible={setModalMessage}>
                {message}
            </Modal>
            <div>
                <p>Make Reservation</p>
                <DateTimePicker
                    name={"Time from"}
                    value={selectedTimeFrom}
                    action={handleTimeFrom}
                />
                <DateTimePicker
                    name={"Time to"}
                    value={selectedTimeTo}
                    action={handleTimeTo}
                />
                <Select
                    label={"Zone: "}
                    options={zoneOptions}
                    action={handleZoneChange}
                />
                <br/>
                <Select
                    label={"Place: "}
                    options={placeOptions}
                    action={handlePlaceChange}
                    isDisabled={isPlaceSelectDisabled}
                />
                <br/>
                <Select
                    label={"Car: "}
                    options={carsOptions}
                    action={handleCarChange}
                />
                <br/>
                <p>{validation}</p>
                <ActBtn action={handleSubmit} label="create"/>
            </div>
        </div>
    );
};

export default NewReservation;
