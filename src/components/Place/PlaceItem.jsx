import React from 'react';
import cl from './Place.module.css'
import placeLogo from "../../images/place_logo.png";
import {useNavigate} from "react-router-dom";

const PlaceItem = (props) => {
    const navigate = useNavigate();
    let statusClass;

    const handlePickClick = () => {
        localStorage.setItem("selectedZone", JSON.stringify(props.zone));
        localStorage.setItem("selectedPlace", JSON.stringify(props.place));
        navigate("/new-reservation");
    }
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
            <button className={cl.btn} onClick={handlePickClick}>PICK</button>
        </div>
    );
}

export default PlaceItem;

