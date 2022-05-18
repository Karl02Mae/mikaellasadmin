import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { storage, db, auth } from '../utils/firebase';
import { useHistory } from 'react-router-dom';

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
        height: '83%',
        width: '70%',
        border: '2px solid black',
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UploadButton: {
        width: '30%',
        margin: 5,
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
    textFields: {
        width: '350px',
    },
    GLineOne: {
        display: 'flex',
        width: '70%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
}

export default function AddBookingReport(props) {

    const [roomType, setRoomType] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [photo, setPhoto] = useState(null);
    const [progress, setProgress] = useState(0);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const history = useHistory();
    const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');

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
            setPhoto(e.target.files[0]);
            console.log(photo);
        }
    };

    const handleUpload = () => {
        if (photo === null) {
            alert("No Image Selected!");
        } else {
            const imageName = photo.name;
            const uploadTask = storage.ref('ReportStorage/' + imageName).put(photo);

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
                        .ref("ReportStorage")
                        .child(imageName)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("BookingReport").add({
                                imageUrl: url,
                                DateCreated: date,
                                From: from,
                                To: to,
                                RoomType: roomType,
                                TotalAmount: totalAmount,
                            });

                            db.collection('RecentActivities').add({
                                Name: adminName,
                                Action: 'Added a Booking Report',
                                Date: date,
                            }).catch((error) => {
                                console.log(error);
                            });

                            console.log(date);
                            alert('Upload Success!');
                            setProgress(0);
                            setPhoto(null);
                            setFrom('');
                            setTo('');
                            setRoomType('');
                            setTotalAmount('');
                            history.push('/bookingreport')
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
            <Box>
                <Box sx={style.UploadContainer}>
                    <Box sx={style.UploadHeader}>
                        <Box></Box>
                        <Box sx={style.HeaderLeft}>
                            <Typography sx={style.HeaderText}>Add Booking Report</Typography>
                            <Typography sx={style.HeaderSubtext}>Add new Report here.</Typography>
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
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Room Type</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the Room Type.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Room Type'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setRoomType(e.target.value) }}
                                value={roomType}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>From</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the starting date of the report.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Starting Date of Report'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setFrom(e.target.value) }}
                                value={from}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>To</Typography>
                                <Typography sx={style.GSetSubtext}>Specify ending date of report</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='End Date of Report'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setTo(e.target.value) }}
                                value={to}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Total Amount</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the Total Amount</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                type='number'
                                id='HotelName'
                                className='hotName'
                                placeholder='Total Amount'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setTotalAmount(e.target.value) }}
                                value={totalAmount}
                            />
                        </Box>
                        <Button
                            sx={style.UploadButton}
                            variant='contained'
                            color='secondary'
                            onClick={handleUpload}
                        >
                            Add Report
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }

}
