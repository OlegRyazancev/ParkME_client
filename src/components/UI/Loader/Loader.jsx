import React from 'react';
import {BeatLoader} from "react-spinners";
import cl from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={cl.loaderContainer}>
            <BeatLoader
                color="white"
                margin={2}
                size={15}
                speedMultiplier={1}
            />
        </div>
    );
};

export default Loader;