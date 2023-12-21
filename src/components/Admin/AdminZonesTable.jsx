import React from 'react';
import cl from "./Admin.module.css";
import {Link} from "react-router-dom";

const AdminZonesTable = ({
                             zones,
                             onCreatePlaces,
                             onUpdateZone,
                             onDelete,
                             onCreateZone
                         }) => {

    const sortedZones = zones.sort((a, b) => a.id - b.id);

    return (
        <div className={cl.itemsContainer}>
            <p className={cl.propHeader}>Zones</p>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Number</th>
                    <th>All places</th>
                    <th>Free places</th>
                </tr>
                </thead>
                <tbody>
                {sortedZones.map((zone, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <Link className={cl.lnk} to={`/zones/${zone.id}`}>
                                {zone.number}
                            </Link>
                        </td>
                        <td>{zone?.totalPlaces}</td>
                        <td>{zone?.freePlaces}</td>
                        <td>
                            <button onClick={() => onCreatePlaces(zone.id)}>
                                Add places
                            </button>
                        </td>
                        <td>
                            <button onClick={() => onUpdateZone(zone.id)}>
                                Edit
                            </button>
                        </td>
                        <td>
                            <button onClick={() => onDelete(zone.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className={cl.createBtn} onClick={onCreateZone}>
                Create zone
            </button>
        </div>
    );
};

export default AdminZonesTable;