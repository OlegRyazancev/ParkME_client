import React from 'react';
import cl from './Reservations.module.css'

const ReservationInfo = ({reservation}) => {
    return (
        <div className={cl.infoContainer}>
            <p className={cl.resHeader}>reservationInfo</p>

            <p><span>Time from: </span> {reservation.timeFrom}</p>
            <p><span>Time to: </span>{reservation.timeTo}</p>
            <p><span>Status: </span>{reservation.status}</p>
            {reservation.zone && (
                <p><span>Zone: </span> {reservation.zone.number} </p>
            )}
             {reservation.place && (
                <p><span>Place: </span>{reservation.place.number}</p>
            )}
            {reservation.car && (
                <p><span>Car: </span>{reservation.car.number}</p>
            )}
        </div>
    );
};

export default ReservationInfo;
