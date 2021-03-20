import React from 'react';
import header from '../../images/Header.jpg';
import './Home.css'
import vehicles from '../../fakeData/fakeData';
import Vehicle from '../Vehicle/Vehicle';
import Header from '../Header/Header';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(${header})` }} className='image'>
            
            <div  className='vehicles-container'>
            {
                vehicles.map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle}></Vehicle>)
            }
            </div>
            
        </div>
        </div>
        
    );
};

export default Home;