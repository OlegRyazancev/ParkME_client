import React from 'react';
import cl from './Place.module.css'
import placeLogo from "../../images/place_logo.png";

const PlaceItem = (props) => {
    let statusClass;

    switch (props.place.status) {
        case 'FREE':
            statusClass = cl.free;
            break;
        case 'OCCUPIED':
            statusClass = cl.occupied;
            break;
        case 'DISABLE':
            statusClass = cl.disable;
            break;
        default:
            statusClass = '';
    }
    return (
        <div className={cl.placeContainer}>
            <div className={cl.placeProps}>
                <span className={cl.num}>Place {props.place.number}</span>
                <span className={statusClass}>{props.place.status}</span>
            </div>
            <img className={cl.placeImg} src={placeLogo} alt="place_logo"/>
            <button className={cl.btn}>PICK</button>
        </div>
    );
}

export default PlaceItem;

