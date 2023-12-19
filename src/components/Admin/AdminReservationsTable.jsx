import React from 'react';
import cl from "./Admin.module.css";

const AdminReservationsTable = ({reservations, onDelete}) => {

    const sortedReservations = [...reservations].sort((a, b) => a.id - b.id);

    return (
        <div>
            <p className={cl.propHeader}>Reservations</p>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Time From</th>
                    <th>Time To</th>
                    <th>Zone</th>
                    <th>Place</th>
                    <th>Car</th>
                    <th>Status</th>
                    <th>User</th>
                </tr>
                </thead>
                <tbody>
                {sortedReservations.map((reservation, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{reservation.timeFrom}</td>
                        <td>{reservation.timeTo}</td>
                        <td>{reservation.zone?.number}</td>
                        <td>{reservation.place?.number}</td>
                        <td>{reservation.car?.number}</td>
                        <td>{reservation.status}</td>
                        <td>{reservation.user?.email}</td>
                        <td>
                            <button
                                onClick={() => onDelete(reservation.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReservationsTable;