import React, { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import './GalleryCard.css';

export default function PromoCard(props) {

    const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


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
            }
            return <div key={id}></div>
        })
    }, [admin, adminName, currentUser])

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

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            db.collection('Promos').doc(props.id).delete().then(() => {
                console.log('Promo Successfully Deleted')
                alert('Deleted Successfully!');
            }).catch((error) => {
                console.error('Error Deleting Promo', error)
            });

            db.collection('RecentActivities').add({
                Name: adminName,
                Action: 'Deleted a Promo',
                Date: date,
            }).catch((error) => {
                console.log(error);
            });
        } else {
            console.log('Not Deleted!')
        }
    }

    return (
        <div className="GalleryCard">
            <img className="GalleryCard__thumbnail" src={props.imageUrl} alt="thumbnail" height="200px" />
            <div>
                <div className="Admin__Buttons">
                    <button className='DeleteButton' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}
