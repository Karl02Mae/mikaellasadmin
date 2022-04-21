import React, { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import './GalleryCard.css';


export default function GalleryCard(props) {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setAdmin(authUser);
            } else {
                //user is logged out
                setAdmin(null);
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [admin]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            db.collection('sharedGallery').doc(props.id).delete().then(() => {
                console.log('Image Successfully Deleted')
                alert('Deleted Successfully!');
            }).catch((error) => {
                console.error('Error Deleting Image', error)
            })
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
