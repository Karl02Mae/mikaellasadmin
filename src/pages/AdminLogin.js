import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../utils/firebase';
import './AdminLogin.css';
import TopLogo from '../img/TopLogo.png';
import BotCurl from '../img/Curl 3.png';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function AdminLogin() {

    const history = useHistory("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            const push = () => {
                history.push('/');
            }
            if (authUser) {
                //user has logged in
                push();
            } else {
                //user is logged out
                console.log('Log in!')
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [history]);

    const login = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            alert('Logged in successfully!')
            history.push("/")
        }).catch((e) => {
            if (e.message === "Firebase: The email address is badly formatted. (auth/invalid-email).") {
                alert("Incorrect Email or Password. Please check your credentials again.")
            }
            else if (e.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                alert("Please check your credentials again.")
            }
            else {
                alert(e.message);
            }
        })
    }

    return (
        <HelmetProvider>
            <div className='Login__BG_Container'>
                <Helmet>
                    <title>Admin - Login</title>
                    <meta
                        name="description"
                        content="Welcome to Mikaella's Resort and Events Place - Admin Site!. "
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:description"
                        content="Welcome to Mikaella's Resort and Events Place - Admin Site!."
                        data-react-helmet="true"
                    />
                    <meta
                        name="keywords"
                        content="Bulacan, Bustos, Resort, Mikaellas"
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:title"
                        content="Mikaella's Resort and Events Place"
                        data-react-helmet="true"
                    />
                </Helmet>
                <img className='TopCurl'
                    src={TopLogo}
                    alt="Mikaella's Resort and Events Place Logo"
                />
                <div className='Login__FG_Container'>
                    <form className='LoginForm'>
                        <label for="AdminInp">Admin:</label>
                        <input type="text"
                            id="AdminInp"
                            name="AdminInp"
                            className='AdminInp'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="PasswordInp">Password:</label>
                        <input type="password"
                            id="PasswordInp"
                            name="PasswordInp"
                            className='PasswordInp'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="LoginButton" onClick={login}>
                            LOGIN
                        </button>
                    </form>
                </div>
                <img className='BotCurl'
                    src={BotCurl}
                    alt="Mikaella's Resort and Events Place Logo"
                />
            </div>
        </HelmetProvider>
    )
}

export default AdminLogin