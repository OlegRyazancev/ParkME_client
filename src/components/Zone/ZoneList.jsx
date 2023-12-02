import React, {useEffect, useState} from 'react';
import ZoneItem from "./ZoneItem";
import cl from '../../pages/Zones/Zones.module.css'

const ZoneList = ({zones}) => {
    const [showNotFound, setShowNotFound] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowNotFound(true);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    if (!zones.length && showNotFound) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Zones not found!
            </h1>
        )
    }

    return (
        <div className={cl.zoneList}>
            {zones.map((zone) =>
                <ZoneItem zone={zone} key={zone.id}/>
            )}
        </div>
    );
};

export default ZoneList;