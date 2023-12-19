import React, {useState} from 'react';

const PlaceForm = ({create, validation}) => {
    const [countPlaces, setCountPlaces] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        create(countPlaces);
    }
    return (
        <div>
            <form>
                <p>Create places</p>
            </form>
            <div>
                <span>Select count of new places: </span>
                <input
                    type="number"
                    onChange={(e) => setCountPlaces(e.target.value)}
                    value={countPlaces}
                    placeholder={"1-50"}
                />
            </div>
            <p>{validation}</p>
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default PlaceForm;