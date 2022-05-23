import React, { useState, useEffect } from 'react';
import './Header.css';
import { auth, db } from '../utils/firebase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NotificationsNone } from "@material-ui/icons";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

import DisplayNotif from './modals/DisplayNotif';

export default function Header() {

    const [admin, setAdmin] = useState([]);
    const [notif, setNotif] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');
    const [adminTitle, setAdminTitle] = useState('');
    const [showL, setShowL] = useState(false);
    const [show, setShow] = useState(false);
    const history = useHistory("");
    var notifNum = 0;

    const handleLogout = () => {
        if (window.confirm('Log out?') === true) {
            alert("logged out!");
            auth.signOut();
            history.push('/login');
        } else {
            alert('Cancelled!');
        }
    };

    const handleShow = () => {
        if (show === false) {
            setShow(true);
        } else if (show === true) {
            setShow(false);
        }
    };

    useEffect(() => {
        db.collection('admin').onSnapshot(snapshot => {
            setAdmin(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    useEffect(() => {
        admin.map(({ id, data }) => {
            if (currentUser === data.adminID) {
                setAdminName(data.adminName);
                setAdminTitle(data.adminTitle);
                console.log(adminName, adminTitle);
            }
            return <div key={id}></div>
        })
    }, [admin, adminName, adminTitle, currentUser])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setCurrentUser(authUser.uid)
            } else if (!authUser) {
                //user is logged out
                console.log('Log in!');
                history.push('/login');
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [history]);

    useEffect(() => {
        db.collection('Notifications').onSnapshot(snapshot => {
            setNotif(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })));
        });
    }, []);

    return (
        <div className="header">
            <div className="headerWrapper">
                <div className="topLeft">
                    {
                        notif.map(({ id, data }) => {
                            if (data.Status === 'Unread') {
                                return notifNum = notifNum + 1;
                            } else {
                                return <div key={id}></div>
                            }
                        })
                    }
                </div>

                {showL === false ? (
                    <div className='AvatarContainer' onClick={() => setShowL(true)}>
                        <AccountCircleIcon className='topAvatar' />
                    </div>
                ) : (
                    <div className='LogoutContainer'>
                        <LogoutIcon className='LogoutIcon' onClick={() => { setShowL(false); handleLogout(); }} />
                    </div>
                )}

                <div className='NameContainer'>
                    <h4 className='AdminTitle'>{adminTitle}</h4>
                    <h3 className='AdminName'>{adminName}</h3>
                </div>
                <div className="topRight">
                    <div className="headerIconContainer" onClick={handleShow}>
                        <NotificationsNone />
                        {
                            notifNum === 0 ? (
                                <span></span>
                            ) : (
                                <span className="topIconBadge">{notifNum}</span>
                            )
                        }

                    </div>
                    <DisplayNotif show={show} />
                </div>
            </div>
        </div>
    );
}