import React, {useState} from 'react';

const ZoneForm = ({action, validation, zoneId}) => {

    const [zone, setZone] = useState({number: null});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (zoneId !== null) {
            const updatedZone = {
                ...zone, id: zoneId
            }
            action(updatedZone);
        } else {
            action(zone);
        }
        setZone({number: ''});
    }

    return (
        <div>
            <form>
                <p>
                    {zoneId !== null
                        ? 'Edit zone'
                        : 'Create zone'}
                </p>
                <div>
                    <span>Enter new zone number: </span>
                    <input type="number"
                           onChange={(e) =>
                               setZone({
                                   ...zone,
                                   number: e.target.value
                               })}
                           value={zone.number}
                           placeholder={"Zone number"}
                    />
                </div>
                <p>{validation}</p>
                <button onClick={handleSubmit}>
                    {zoneId !== null
                        ? 'Save'
                        : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default ZoneForm;