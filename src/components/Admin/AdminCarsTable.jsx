import React from 'react';
import cl from "./Admin.module.css";

const AdminCarsTable = ({cars, onDelete}) => {

    const sortedCars = [...cars].sort((a, b) => a.id - b.id);

    return (
        <div>
            <p className={cl.propHeader}>Cars</p>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Number</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {sortedCars.map((car, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{car.number}</td>
                        <td>{car.type}</td>
                        <td>
                            <button onClick={() => onDelete(car.id)}>
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

export default AdminCarsTable;