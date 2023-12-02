import React, {useEffect, useState} from 'react';
import PlaceItem from "./PlaceItem";
import cl from "./Place.module.css"

const PlaceList = ({places}) => {


    const [showNotFound, setShowNotFound] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowNotFound(true);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    if (!places.length && showNotFound) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Places not found!
            </h1>
        )
    }
    return (
        <div className={cl.placeList}>
            {places.map((place) =>
                <PlaceItem place={place} key={place.id}/>
            )}
        </div>
    )
};
export default PlaceList;