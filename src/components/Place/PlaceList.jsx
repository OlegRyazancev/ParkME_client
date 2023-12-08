import React, {useEffect, useState} from 'react';
import PlaceItem from "./PlaceItem";
import cl from "./Place.module.css"

const PlaceList = ({places}) => {
    const [showNotFound, setShowNotFound] = useState(false);
    const sortedPlaces = places.slice().sort((a, b) => a.number - b.number);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowNotFound(true);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    if (!sortedPlaces.length && showNotFound) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Places not found!
            </h1>
        )
    }
    return (
        <div className={cl.placeList}>
            {sortedPlaces.map((place) =>
                <PlaceItem place={place} key={place.id}/>
            )}
        </div>
    )
};
export default PlaceList;