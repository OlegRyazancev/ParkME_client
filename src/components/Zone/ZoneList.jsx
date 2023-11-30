import React from 'react';
import ZoneItem from "./ZoneItem";
import cl from './Zone.module.css'

const ZoneList = ({zones}) => {
    if (!zones.length) {
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