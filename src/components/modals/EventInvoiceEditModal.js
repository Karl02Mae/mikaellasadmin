import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, InputLabel, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { db, auth } from '../utils/firebase';

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
        height: '40%',
        width: '50%',
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
    InputLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        marginRight: 2,
        marginBottom: 3,
    },
}

export default function EventInvoiceEditModal(props) {

    const [status, setStatus] = useState('Paid');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
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

    const handleUpload = () => {
        db.collection('RecentActivities').add({
            Name: adminName,
            Action: 'Updated an Invoice',
            Date: date,
        }).catch((error) => {
            console.log(error);
        });

        db.collection('EventsDetails').doc(props.ids).update({
            paymentStatus: status,
        }).then(() => {
            alert('Updated Successfully!');
            props.onClose();
        })
    }

    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box>
                <Box sx={style.UploadContainer}>
                    <Box sx={style.UploadHeader}>
                        <Box></Box>
                        <Box sx={style.HeaderLeft}>
                            <Typography sx={style.HeaderText}>Update Invoice Status</Typography>
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
                        <Box sx={style.InputLabel}>
                            <InputLabel id="StatusType">Select Status</InputLabel>
                            <Select
                                labelid="StatusType"
                                id="status"
                                value={status}
                                label="status"
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value='Paid'>Paid</MenuItem>
                                <MenuItem value='Half'>Half Paid</MenuItem>
                                <MenuItem value='Pending'>Pending</MenuItem>
                                <MenuItem value='Refund'>Refund</MenuItem>
                            </Select>
                        </Box>
                        <Button
                            sx={style.UploadButton}
                            variant='contained'
                            color='secondary'
                            onClick={handleUpload}
                        >
                            Update Status
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}
