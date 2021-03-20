import React, { useState } from 'react';
import { useParams } from 'react-router';
import Header from '../Header/Header';
import vehicles from '../../fakeData/fakeData';
import './Search.css';
import { Map, GoogleApiWrapper} from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const Search = (props) => {

    const mapStyles = {
        width: '60%', height: '65%',
    };

    const { id } = useParams();
    console.log(id)

    const [location, setLocation] = useState({});
    const [isSearch, setIsSearch] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearch(!isSearch);
    }

    const handleBlur = (e) => {
        const newLocation = { ...location };
        newLocation[e.target.name] = e.target.value;
        setLocation(newLocation);
    }
    return (
        <div>
            <Header />
            <section className='search-container'>
                <div className='searchLocation'>
                    {
                        !isSearch ? (
                            <form onSubmit={handleSearch}>
                                <div className="form__group field">
                                    <label className="form__label">Pick From</label>
                                    <br />
                                    <input type="text" name="from" placeholder="From" className="form__field" onBlur={handleBlur} required />
                                    <br />
                                    <label className="form__label">Pick To</label>
                                    <br />
                                    <input className="form__field" type="text" placeholder="To" name="to" onBlur={handleBlur} required />
                                    <br />
                                    <button type='submit' className="search-btn">Search</button>
                                </div>
                            </form>

                        )
                            :
                            <div className='searchLocationResult'>
                                {/* location */}
                                <div className='location'>
                                    <h2>From: {location.from}</h2>
                                    <h2>To: {location.to}</h2>
                                </div>
                                {/* vehicles */}
                                <div className='ticketInfo'>
                                    {
                                        vehicles.map(vehicle => {
                                            if (vehicle.id === id) {
                                                return(
                                                    <div className='vehicle-card'>
                                                        <img src={vehicle.imgUrl} alt='' key={id} />
                                                        <h3>{vehicle.title}</h3>
                                                        <h3><span><FontAwesomeIcon icon={faUsers} /></span> {vehicle.passengers}</h3>
                                                        <h3>{vehicle.ticketPrice}</h3>
                                                    </div>
                                                ) 
                                            }
                                        })
                                    }
                                    {
                                        vehicles.map(vehicle => {
                                            if (vehicle.id === id) {
                                                return(
                                                    <div className='vehicle-card'>
                                                        <img src={vehicle.imgUrl} alt='' key={id} />
                                                        <h3>{vehicle.title}</h3>
                                                        <h3><span><FontAwesomeIcon icon={faUsers} /></span> {vehicle.passengers}</h3>
                                                        <h3>{vehicle.ticketPrice}</h3>
                                                    </div>
                                                ) 
                                            }
                                        })
                                    }
                                    {
                                        vehicles.map(vehicle => {
                                            if (vehicle.id === id) {
                                                return(
                                                    <div className='vehicle-card'>
                                                        <img src={vehicle.imgUrl} alt='' key={id} />
                                                        <h3>{vehicle.title}</h3>
                                                        <h3><span><FontAwesomeIcon icon={faUsers} /></span> {vehicle.passengers}</h3>
                                                        <h3>{vehicle.ticketPrice}</h3>
                                                    </div>
                                                ) 
                                            }
                                        })
                                    }
                                </div>
                                <button className='cancel-btn' onClick={() => setIsSearch(!isSearch)}>Cancel</button>
                            </div>
                    }


                </div>
                <div className='map'>
                <Map
                        google={props.google}
                        zoom={10}
                        style={mapStyles}
                        
                    >
                </Map>
                </div>
            </section>

        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEu4X_Ixgh9vtHUrMLlF1qhOPG7hWlSIk'
})(Search);