import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, InputLabel, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { storage, db } from '../utils/firebase';
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
    InputLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        marginRight: 2,
        marginBottom: 3,
    },
}

export default function AddRnCModal(props) {

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [roomNo, setRoomNo] = useState('');
    const [roomType, setRoomType] = useState('');
    const [bedCap, setBedCap] = useState('');
    const [rent, setRent] = useState('');
    const [status, setStatus] = useState('Open');
    const [AC, setAC] = useState('AC');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const history = useHistory();

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
            const uploadTask = storage.ref('roomCottageStorage/' + imageName).put(image);

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
                        .ref("roomCottageStorage")
                        .child(imageName)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("RoomCottage").add({
                                imageUrl: url,
                                date: date,
                                ACNAC: AC,
                                BedCap: bedCap,
                                Rent: rent,
                                RoomNo: roomNo,
                                RoomType: roomType,
                                Status: status,
                            });

                            console.log(date);
                            alert('Upload Success!');
                            setProgress(0);
                            setImage(null);
                            setAC('AC');
                            setBedCap('');
                            setRent('');
                            setRoomNo('');
                            setRoomType('');
                            setStatus('Open');
                            history.push('/allroomsandcottages')
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
                            <Typography sx={style.HeaderText}>Add Room/Cottage</Typography>
                            <Typography sx={style.HeaderSubtext}>Add new Room or Cottage here.</Typography>
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
                                <Typography sx={style.GSetText}>Room No.</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the room/cottage number.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Room/Cottage No.'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setRoomNo(e.target.value) }}
                                value={roomNo}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Room Type</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the room/cottage type.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Room/Cottage Type'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setRoomType(e.target.value) }}
                                value={roomType}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Bed Capacity</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the bed capacity</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Bed Capacity'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setBedCap(e.target.value) }}
                                value={bedCap}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Rent</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the rent price</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Rent'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setRent(e.target.value) }}
                                value={rent}
                            />
                        </Box>
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
                                <MenuItem value='Open'>Open</MenuItem>
                                <MenuItem value='Booked'>Booked</MenuItem>
                                <MenuItem value='Pending'>Pending</MenuItem>
                                <MenuItem value='Free'>Free</MenuItem>
                            </Select>
                            <InputLabel id="ACType">Select AC/NON-AC</InputLabel>
                            <Select
                                labelid="ACType"
                                id="AC"
                                value={AC}
                                label="status"
                                onChange={(e) => {
                                    setAC(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value='AC'>AC</MenuItem>
                                <MenuItem value='Non - AC'>Non - AC</MenuItem>
                            </Select>
                        </Box>
                        <Button
                            sx={style.UploadButton}
                            variant='contained'
                            color='secondary'
                            onClick={handleUpload}
                        >
                            Add Room/Cottage
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}
