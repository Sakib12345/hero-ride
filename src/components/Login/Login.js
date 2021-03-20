import Header from '../Header/Header';
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';
import firebaseConfig from '../../firebase.config';
import './Login.css';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
// Initialize Firebase

const Login = () => {

    const [newUser, setNewUser] = useState(false)

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: ''
    })


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation()

    const { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                console.log('i am from google', email);
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setUser(signedInUser)
                setLoggedInUser(signedInUser);
                history.replace(from);

            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }


    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)
                    // ..
                });

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo);

                });
        }
        event.preventDefault()
    }
    //function finished


    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(() => {
            console.log('Username updated successfully', name)
        }).catch((error) => {
            console.log(error)
        });
    }


    const handleChange = (event) => {
        let fieldValid = true;
        if (event.target.name === 'email') {
            fieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            fieldValid = passwordHasNumber && isPasswordValid
        }
        if (fieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }


    return (
        <div>
            <Header></Header>
            <section className='login-section'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className='form_group'>
                    {newUser &&
                        <input className='form_field' type="text" onChange={handleChange} name="name" placeholder="Your Name" required />}

                    <label className="form_label">Email</label>
                    <input type="text" className='form_field' onChange={handleChange} placeholder="Your Email Address" name="email" required />
                    <br />
                    <br />
                    <label className="form_label">Password</label>
                    <input type="password" className='form_field' onChange={handleChange} name="password" id="" placeholder="Your Password" required />
                    <br />
                    <br />
                    <input type="submit" className="sign-in-btn" value={newUser ? 'Sign Up' : 'Sign In'} />
                </form>
                <section style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span>Are you a new user? </span>
                    <button className='btn-newUser' onClick={() => setNewUser(!newUser)}  >
                        Sign Up....
                    </button>
                </section>
                <button className='google-sign-in-btn' onClick={handleGoogleSignIn}>Sign in with Google</button>
                {
                    user.success ? <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged in'} Successfully</p> : <p style={{ color: 'red' }}>{user.error}</p>
                }
            </section>
        </div>
    );
};

export default Login;