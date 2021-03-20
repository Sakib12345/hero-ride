import {React, useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo/hero-ride-logo.png';
import './Header.css';
import { useState } from 'react';
import { UserContext } from '../../App';
import "firebase/auth";
import firebase from "firebase/app";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
    })

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then((res) => {
                const signOutUser = {
                    userSignedIn: false,
                    name: '',
                    email: '',
                    error: '',
                    success: false
                }
                setUser(signOutUser)
                // Sign-out successful.
            }).catch((error) => {
                console.log(error)
            })

    }

    return (
        <div className="header">
            <nav className="nav">
                <ul className="ul">
                    <li>
                        <img className="logo" src={logo} alt=""/>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/search/:id">Destination</Link>
                    </li>
                    <li>
                        <Link to="/">Blog</Link>
                    </li>
                    <li>
                        <Link to="/">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">
                        {
                            loggedInUser.email ?  <button onClick={handleSignOut} className="login-btn">Logout</button> :
                            <button className="login-btn">Login</button>
                        }   
                        </Link>
                    </li>
                    <li>
                        {
                            loggedInUser.name? loggedInUser.name : loggedInUser.email 
                        }
                    </li>
                    
                </ul>
            </nav>
            </div>
    );
};

export default Header;