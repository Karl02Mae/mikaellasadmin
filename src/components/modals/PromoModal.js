import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { storage, db, auth } from '../utils/firebase';
import { useHistory } from 'react-router-dom';
import './UploadModal.css';

const style = {
    UploadContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100%',
        width: '98%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '99',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 2,
    },
    UploadHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '5%',
    },
    HeaderLeft: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: '30px',
        color: 'white',
    },
    HeaderSubtext: {
        fontWeight: '500',
        fontSize: 'small',
        color: 'white',
    },
    HeaderRight: {
        display: 'flex',
        color: 'white',
    },
    closeIcon: {
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '15px',
    },
    UploadContent: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        height: '50%',
        width: '70%',
        border: '2px solid black',
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UploadButton: {
        width: '30%',
        margin: 5,
    }
}

export default function PromoModal(props) {

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');

    const history = useHistory();

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

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (image === null) {
            alert("No Image Selected!");
        } else {
            const imageName = image.name;
            const uploadTask = storage.ref('PromoStorage/' + imageName).put(image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //progress function...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    //Error Function...
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    //complete function..
                    storage
                        .ref("PromoStorage")
                        .child(imageName)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("Promos").add({
                                imageUrl: url,
                                date: date,
                            });

                            db.collection('RecentActivities').add({
                                Name: adminName,
                                Action: 'Added a new Promo',
                                Date: date,
                            }).catch((error) => {
                                console.log(error);
                            });

                            console.log(date);
                            alert('Upload Success!');
                            setProgress(0);
                            setImage(null);
                            history.push('/promos')
                            props.onClose();
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            );

        }
    };

    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box sx={style.UploadContainer}>
                <Box sx={style.UploadHeader}>
                    <Box></Box>
                    <Box sx={style.HeaderLeft}>
                        <Typography sx={style.HeaderText}>Upload</Typography>
                        <Typography sx={style.HeaderSubtext}>Upload Photos here</Typography>
                    </Box>
                    <Box sx={style.HeaderRight}>
                        <Tooltip title="Close">
                            <IconButton onClick={props.onClose} >
                                <CloseIcon sx={style.closeIcon} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={style.UploadContent}>
                    <progress
                        className="upload__progress"
                        value={progress}
                        max="100"
                    />
                    <input
                        className="imageupload__button"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleChange}
                    />
                    <Button
                        sx={style.UploadButton}
                        variant='contained'
                        color='secondary'
                        onClick={handleUpload}
                    >
                        Upload Image
                    </Button>
                </Box>
            </Box>
        )
    }
}
