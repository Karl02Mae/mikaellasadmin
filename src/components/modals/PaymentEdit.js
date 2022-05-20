import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
import { db, storage, auth } from '../utils/firebase';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const style = {
    RncEditContainer: {
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
    RnCEditContentContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        height: '83%',
        width: '70%',
        border: '2px solid black',
        borderRadius: '10px',
        alignItems: 'center',
    },
    RnCEditHeader: {
        display: 'flex',
        width: '100%',
        marginTop: 2,
        justifyContent: 'space-between',
    },
    RnCEditContent: {
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        width: '100%',
    },
    GLineOne: {
        display: 'flex',
        width: '70%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
        paddingLeft: 2,
    },
    textFields: {
        width: '350px',
    },
    GSetAllText: {
        display: 'flex',
        flexDirection: 'column',
    },
    GSetText: {
        fontWeight: '600',
        fontSize: '15px',
        color: '#454545',
    },
    GSetSubtext: {
        fontWeight: '500',
        fontSize: '12px',
        color: 'gray',
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: 'black',
    },
    UploadButton: {
        width: '30%',
        margin: 5,
        alignSelf: 'center',
    },
    InputLabel: {
        display: 'flex',
        width: '100%',
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 3,
    },
}

export default function PaymentEdit(props) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState('');
    const [acct, setAcct] = useState('');
    const [MoP, setMoP] = useState('');
    const [email, setEmail] = useState('');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');

    const [dbData, setDbData] = useState([]);

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

    useEffect(() => {
        db.collection('PaymentMethods').orderBy('No').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, []);

    const handleSearch = () => {
        dbData.map(({ id, data }) => {
            if (id === props.ids) {
                setAcct(data.AcctNo);
                setEmail(data.Email);
                setMoP(data.MoPName);
                setName(data.Name);
            }
            return <Box key={id}></Box>
        })
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpdate = () => {

        if (image === null) {
            alert("No Image Selected!");
        } else {
            const imageName = image.name;
            const uploadTask = storage.ref('PaymentStorage/' + imageName).put(image);

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
                        .ref("PaymentStorage")
                        .child(imageName)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("PaymentMethods").doc(props.ids).update({
                                QR: url,
                                AcctNo: acct,
                                Email: email,
                                MoPName: MoP,
                                Name: name,
                            });

                            db.collection('RecentActivities').add({
                                Name: adminName,
                                Action: 'Editted Payment Methods',
                                Date: date,
                            }).catch((error) => {
                                console.log(error);
                            });

                            console.log(date);
                            alert('Update Success!');
                            setProgress(0);
                            setImage(null);
                            setName('');
                            setEmail('');
                            setAcct('');
                            setMoP('');
                            props.onClose();
                            history.push('/paymentmethods');
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            );
        }
    }


    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box sx={style.RncEditContainer}>
                <Box sx={style.RnCEditContentContainer}>
                    <Box sx={style.RnCEditHeader}>
                        <Box></Box>
                        <Typography sx={style.HeaderText}>Edit Payment Methods</Typography>
                        <Box>
                            <Tooltip title="Close">
                                <IconButton
                                    onClick={props.onClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={style.RnCEditContent}>
                        <Tooltip title='Display Selected'>
                            <IconButton onClick={handleSearch}>
                                <ManageSearchIcon />
                                <Typography>Click to display current data</Typography>
                            </IconButton>
                        </Tooltip>
                        <progress
                            className="upload__progress"
                            value={progress}
                            max="100"
                        />
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>QR Code</Typography>
                                <Typography sx={style.GSetSubtext}>Upload QR Code for Mode of Payment</Typography>
                            </Box>
                            <input
                                className="imageupload__button"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleChange}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Mode of Payment Name</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the Mode of Payment. e.g. Gcash, Paymaya.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Mode of Payment'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setMoP(e.target.value) }}
                                value={MoP}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Name</Typography>
                                <Typography sx={style.GSetSubtext}>Specify your Name.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Name of MoP Owner'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setName(e.target.value) }}
                                value={name}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Account Number</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the Account Number of MoP</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Account Number'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setAcct(e.target.value) }}
                                value={acct}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Email</Typography>
                                <Typography sx={style.GSetSubtext}>Specify your Email Address</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Email'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setEmail(e.target.value) }}
                                value={email}
                            />
                        </Box>
                        <Button
                            sx={style.UploadButton}
                            variant='contained'
                            color='secondary'
                            onClick={handleUpdate}
                        >
                            Edit Payment Methods
                        </Button>
                    </Box>
                </Box>
            </Box >
        )
    }
}
