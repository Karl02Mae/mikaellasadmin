import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Select, MenuItem, InputLabel, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { db, storage } from '../utils/firebase';
import { useHistory } from 'react-router-dom';

const style = {
    EditBookingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    EditBookingHeader: {
        padding: '30px',
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#454545',
    },
    EditBookingContent: {
        backgroundColor: 'white',
        height: 'fit-content',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1px solid gray',
        borderRadius: '5px',
    },
    ContentPadding: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '95%',
        width: '95%',
    },
    InputLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        marginRight: 2,
        marginBottom: 3,
    },
    NoteLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: '935px',
        marginRight: 2,
        marginBottom: 3,
    },
    LineOne: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    LineTwo: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    LineThree: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    LineFour: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    Note: {
        display: 'flex',
        marginLeft: 1.5,
    },
    EditButton: {
        marginLeft: 1.5,
        marginBottom: 3,
    },
    SearchBox: {
        display: 'flex',
        marginLeft: 3.5,
        alignItems: 'center',
        marginBottom: 3,
    },
    AddProgress: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
    }
}

export default function EditBookings() {
    const [searchData, setSearchData] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);
    const [pack, setPack] = useState('Package 1');
    const [room, setRoom] = useState('Single');
    const [arriveDate, setArriveDate] = useState(new Date());
    const [departDate, setDepartDate] = useState(new Date());
    const [totalPerson, setTotalPerson] = useState('');
    const [status, setStatus] = useState('Active');
    const [pStatus, setPStatus] = useState('Paid');
    const [noteText, setNoteText] = useState('');
    const [searchID, setSearchID] = useState('');
    const [progress, setProgress] = useState(0);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const history = useHistory();

    useEffect(() => {
        db.collection('Bookings').orderBy('date', 'desc').onSnapshot(snapshot => {
            setSearchData(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
            console.log(photo);
        }
    }

    const handleSearch = () => {
        searchData.map(({ id, data }) => {
            if (searchID === id) {
                setFname(data.FName);
                setLname(data.LName);
                setGender(data.Gender);
                setPhone(data.Phone);
                setEmail(data.Email);
                setAddress(data.Address);
                setPack(data.Package);
                setRoom(data.RoomType);
                setArriveDate(data.ArriveDate);
                setDepartDate(data.DepartDate);
                setTotalPerson(data.TotalPerson);
                setStatus(data.status);
                setPStatus(data.paymentStatus);
                setNoteText(data.Note);
            }
            return <Box key={id}></Box>
        })
    }

    const handleUpdate = () => {
        // searchData.map(({ id }) => {
        //     if (searchID === id) {
        //         console.log('Search Confirmed!')
        //     } else {
        //         alert('ID Not Found!')
        //     }
        //     return <div key={id}></div>
        // })

        // if (window.confirm('Update this Booking info?')) {
        //     db.collection('Bookings').doc(searchID).update({
        //         FName: fname,
        //         LName: lname,
        //         Gender: gender,
        //         Email: email,
        //         Address: address,
        //         Package: pack,
        //         RoomType: room,
        //         ArriveDate: arriveDate,
        //         DepartDate: departDate,
        //         TotalPerson: totalPerson,
        //         status: status,
        //         paymentStatus: pStatus,
        //         Note: noteText,
        //         Phone: phone,
        //     });
        // }

        if (photo === null) {
            alert("No Image Selected!");
        } else {
            const imageName = photo.name;
            const uploadTask = storage.ref('BookingsStorage/' + imageName).put(photo);

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
                        .ref("BookingsStorage")
                        .child(imageName)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("Bookings").doc(searchID).update({
                                imageUrl: url,
                                date: date,
                                FName: fname,
                                LName: lname,
                                Gender: gender,
                                Phone: phone,
                                Email: email,
                                Address: address,
                                Package: pack,
                                RoomType: room,
                                ArriveDate: arriveDate.toDateString(),
                                DepartDate: departDate.toDateString(),
                                TotalPerson: totalPerson,
                                status: status,
                                paymentStatus: pStatus,
                                Note: noteText,
                            });

                            console.log(date);
                            alert('Update Success!');
                            setProgress(0);
                            setPhoto(null);
                            setFname('');
                            setLname('');
                            setGender('Male');
                            setPhone('');
                            setEmail('');
                            setAddress('');
                            setPack('Package 1');
                            setRoom('Single');
                            setArriveDate(null);
                            setDepartDate(null);
                            setTotalPerson('');
                            setNoteText('');
                            history.push('/allbookings')
                        }).catch((error) => {
                            console.log(error);
                            alert('Please reselect Arrival and Depart Date!');
                        });
                }
            );
        }
    }

    return (
        <Box sx={style.EditBookingsContainer}>
            <Typography sx={style.EditBookingHeader}>Edit Booking</Typography>
            <Box sx={style.AddProgress}>
                <progress
                    className="upload__progress"
                    value={progress}
                    max="100"
                />
            </Box>
            <Box sx={style.SearchBox}>
                <TextField
                    placeholder='Search by ID'
                    variant='outlined'
                    size='small'
                    value={searchID}
                    onChange={(e) => {
                        setSearchID(e.target.value);
                    }}
                />
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleSearch}
                >
                    Search Booking
                </Button>
            </Box>
            <Box sx={style.EditBookingContent}>
                <Box sx={style.ContentPadding}>
                    <Box sx={style.LineOne}>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="FnameLabel">First Name</InputLabel>
                            <TextField
                                labelid='FnameLabel'
                                id='fname'
                                className='fname'
                                placeholder='First Name'
                                variant='outlined'
                                size='small'
                                value={fname}
                                onChange={(e) => {
                                    setFname(e.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="LnameLabel">Last Name</InputLabel>
                            <TextField
                                labelid='LnameLabel'
                                id='lname'
                                className='lname'
                                placeholder='Last Name'
                                variant='outlined'
                                size='small'
                                value={lname}
                                onChange={(e) => {
                                    setLname(e.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="GenderLabel">Gender</InputLabel>
                            <Select
                                labelid="GenderLabel"
                                id="gender"
                                value={gender}
                                label="Gender"
                                onChange={(e) => {
                                    setGender(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Box sx={style.LineTwo}>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="Phone">Phone</InputLabel>
                            <TextField
                                labelid='Phone'
                                id='phone'
                                className='phone'
                                placeholder='Phone'
                                variant='outlined'
                                size='small'
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="Email">Email</InputLabel>
                            <TextField
                                labelid='Email'
                                id='email'
                                className='email'
                                placeholder='Email'
                                variant='outlined'
                                size='small'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="Address">Address</InputLabel>
                            <TextField
                                labelid='Address'
                                id='address'
                                className='address'
                                placeholder='Address'
                                variant='outlined'
                                size='small'
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={style.LineThree}>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="Upload_Photo">Upload Photo</InputLabel>
                            <input
                                labelid='Upload_Photo'
                                className="imageupload__button"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleChange}
                            />
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="Select_Package">Select a package</InputLabel>
                            <Select
                                labelid="Select_Package"
                                id="package"
                                value={pack}
                                label="Package"
                                onChange={(e) => {
                                    setPack(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value='Package 1'>Package 1</MenuItem>
                                <MenuItem value='Package 2'>Package 2</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="RoomType">Select Room Type</InputLabel>
                            <Select
                                labelid="RoomType"
                                id="room"
                                value={room}
                                label="Room"
                                onChange={(e) => {
                                    setRoom(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value='Single'>Single</MenuItem>
                                <MenuItem value='Double'>Double</MenuItem>
                                <MenuItem value='Family'>Family</MenuItem>
                                <MenuItem value='Deluxe'>Deluxe</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Box sx={style.LineFour}>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="ArriveDate">Arrival Date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    labelid='ArriveDate'
                                    value={arriveDate}
                                    minDate={new Date()}
                                    onChange={(newValue) => {
                                        setArriveDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} size='small' />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="DepartDate">Depart Date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    labelid='DepartDate'
                                    value={departDate}
                                    minDate={new Date()}
                                    onChange={(newValue) => {
                                        setDepartDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} size='small' />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="TotalPerson">Total Person</InputLabel>
                            <TextField
                                type='number'
                                labelid='TotalPerson'
                                id='tperson'
                                className='tperson'
                                placeholder='Total Person'
                                variant='outlined'
                                size='small'
                                value={totalPerson}
                                onChange={(e) => {
                                    setTotalPerson(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={style.LineThree}>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="Select_Status">Select Booking Status</InputLabel>
                            <Select
                                labelid="Select_Status"
                                id="status"
                                value={status}
                                label="status"
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value='Active'>Active</MenuItem>
                                <MenuItem value='Inactive'>Inactive</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={style.InputLabel}>
                            <InputLabel id="PStatus">Select Payment Status</InputLabel>
                            <Select
                                labelid="PStatus"
                                id="pstatus"
                                value={pStatus}
                                label="pstatus"
                                onChange={(e) => {
                                    setPStatus(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value='Paid'>Paid</MenuItem>
                                <MenuItem value='Pending'>Pending</MenuItem>
                                <MenuItem value='Half - Paid'>Half - Paid</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Box sx={style.Note}>
                        <Box sx={style.NoteLabel}>
                            <InputLabel id="Note">Note</InputLabel>
                            <TextField
                                labelid='Note'
                                id='note'
                                className='note'
                                placeholder='Note'
                                variant='outlined'
                                multiline
                                rows={4}
                                maxRows={10}
                                value={noteText}
                                onChange={(e) => {
                                    setNoteText(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={style.EditButton}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={handleUpdate}
                        >
                            Update Booking
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
