import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
import { db, storage } from '../utils/firebase';
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
    Selection: {
        marginRight: 5,
    }
}

export default function RnCEdit(props) {

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

    const [dbData, setDbData] = useState([]);

    const history = useHistory();

    useEffect(() => {
        db.collection('RoomCottage').orderBy('RoomNo').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, []);

    const handleSearch = () => {
        dbData.map(({ id, data }) => {
            if (id === props.ids) {
                setRoomType(data.RoomType);
                setAC(data.ACNAC);
                setBedCap(data.BedCap);
                setRent(data.Rent);
                setStatus(data.Status);
                setRoomNo(data.RoomNo);
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
                            db.collection("RoomCottage").doc(props.ids).update({
                                imageUrl: url,
                                date: date,
                                RoomNo: roomNo,
                                RoomType: roomType,
                                BedCap: bedCap,
                                Rent: rent,
                                Status: status,
                                ACNAC: AC,
                            });

                            console.log(date);
                            alert('Update Success!');
                            setProgress(0);
                            setImage(null);
                            setRoomNo('');
                            setRoomType('');
                            setBedCap('');
                            setRent('');
                            props.onClose();
                            history.push('/allroomsandcottages');
                        }).catch((error) => {
                            console.log(error);
                            alert('Please reselect Arrival and Depart Date!');
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
                        <Typography sx={style.HeaderText}>Edit Room/Cottage Details</Typography>
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
                            <Box sx={style.Selection}>
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
                            </Box>
                            <Box sx={style.Selection}>
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
                        </Box>
                        <Button
                            sx={style.UploadButton}
                            variant='contained'
                            color='secondary'
                            onClick={handleUpdate}
                        >
                            Edit Room/Cottage
                        </Button>
                    </Box>
                </Box>
            </Box >
        )
    }

}
