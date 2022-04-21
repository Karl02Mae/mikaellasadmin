import React, { useState, useEffect } from 'react';
import './Header.css';
import { auth, db } from '../utils/firebase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NotificationsNone } from "@material-ui/icons";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

export default function Header() {

    const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');
    const [adminTitle, setAdminTitle] = useState('');
    const [showL, setShowL] = useState(false);
    const history = useHistory("");

    const handleLogout = () => {
        if (window.confirm('Log out?') === true) {
            alert("logged out!");
            auth.signOut();
            history.push('/login');
        } else {
            alert('Cancelled!');
        }
    }

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
                console.log('Log in!')
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, []);

    return (
        <div className="header">
            <div className="headerWrapper">
                <div className="topLeft">

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
                    <div className="headerIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">24</span>
                    </div>
                </div>
            </div>
        </div>
    );
}