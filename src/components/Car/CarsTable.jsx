import React from 'react';
import cl from "../../pages/UserProfile/UserProfile.module.css";

const CarsTable = ({cars, onUpdate, onDelete}) => {
    return (
        <div>
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
                            <span className={cl.propName}>
                                type:
                            </span>
                            {car.type}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => onUpdate(car)}>
                            Edit
                        </button>
                        <button onClick={() => onDelete(car.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CarsTable;