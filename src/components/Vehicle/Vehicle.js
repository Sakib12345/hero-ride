import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Vehicle.css';

const Vehicle = (props) => {
    const { id, title, imgUrl} = props.vehicle;

    const history = useHistory()
    const vehicleDetails = (vehicleId) => {
        const url = `/search/${id}`;
        history.push(url);
    }
    return (
            <section onClick={() => vehicleDetails(id)} className="vehicle-section">
                <img src={imgUrl} alt=""/>
                <h2>{title}</h2>
            </section>
        
            
        
    );
};

export default Vehicle;