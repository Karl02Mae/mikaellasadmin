import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import './AdminRegister.css';
import TopLogo from '../img/TopLogo.png';
import BotCurl from '../img/Curl 3.png';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export default function AdminRegister() {

    const history = useHistory("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [name, setName] = useState('');

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

    const register = (e) => {
        if (password === cPassword) {
            e.preventDefault();
            auth.createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    db.collection('admin').add({
                        adminID: authUser.user.uid,
                        adminName: name,
                        adminTitle: 'Administrator',
                    })
                }).catch((error) => alert(error.message));
            history.push("/");
        } else if (password !== cPassword) {
            alert('Password not matched!');
        }
    }

    return (
        <HelmetProvider>
            <div className='Login__BG_Container_R'>
                <Helmet>
                    <title>Admin - Register</title>
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
                <img className='TopCurl_R'
                    src={TopLogo}
                    alt="Mikaella's Resort and Events Place Logo"
                />
                <div className='Login__FG_Container_R'>
                    <form className='LoginForm_R'>
                        <div className='TOP_R'>
                            <div className='Left-Form_R'>
                                <label for="AdminInp_R">Admin Email:</label>
                                <input type="text"
                                    id="AdminInp"
                                    name="AdminInp"
                                    className='AdminInp_R'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <label for="PasswordInp_R">Password:</label>
                                <input type="password"
                                    id="PasswordInp"
                                    name="PasswordInp"
                                    className='PasswordInp_R'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <div className='Right-Form_R'>
                                <label for="PasswordInp_R">Confirm Password:</label>
                                <input type="password"
                                    id="PasswordInp"
                                    name="PasswordInp"
                                    className='PasswordInp_R'
                                    onChange={(e) => setCPassword(e.target.value)}
                                    value={cPassword}
                                />
                                <label for="AdminInp_R">Name:</label>
                                <input type="text"
                                    id="AdminInp"
                                    name="AdminInp"
                                    className='AdminInp_R'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                        </div>
                        <div className='BOTTOM_R'>
                            <button type="submit" className="LoginButton_R" onClick={register}>
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>
                <img className='BotCurl_R'
                    src={BotCurl}
                    alt="Mikaella's Resort and Events Place Logo"
                />
            </div>
        </HelmetProvider>
    )
}
