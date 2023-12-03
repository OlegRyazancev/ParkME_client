import React from 'react';
import cl from "./Reservations.module.css";
import ActBtn from "../UI/Button/ActBtn";

const ReservationsTable = ({ reservations }) => {
    return (
        <table>
            <tbody>
            {reservations.map((reservation) => (
                <tr key={reservation.id}>
                    <td>
                        <ActBtn label="cancel"/>
                    </td>
                    <td>
                        <ActBtn label="edit"/>
                    </td>
                    <td className={cl.timeRange}>
                        {reservation.timeFrom} - {reservation.timeTo}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ReservationsTable;
