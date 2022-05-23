import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Select, MenuItem, InputLabel, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useHistory } from 'react-router-dom';
import { storage, db, auth } from '../utils/firebase';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const style = {
    AddBookingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    AddBookingHeader: {
        padding: '30px',
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#454545',
    },
    AddBookingContent: {
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
    AddButton: {
        marginLeft: 1.5,
        marginBottom: 3,
    },
    AddProgress: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
    }
}

export default function AddBookings() {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('GCash');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);
    const [pack, setPack] = useState('Phase 1');
    const [payment, setPayment] = useState('Full Payment');
    const [arriveDate, setArriveDate] = useState(new Date());
    const [departDate, setDepartDate] = useState('Day Tour');
    const [totalPerson, setTotalPerson] = useState('');
    const [status, setStatus] = useState('Active');
    const [pStatus, setPStatus] = useState('Paid');
    const [price, setPrice] = useState('');
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
            setPhoto(e.target.files[0]);
            console.log(photo);
        }
    }

    const handleUpload = () => {
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
                            db.collection("SummaryBook").add({
                                imageUrl: url,
                                CustomerName: fname + ' ' + lname,
                                Phone: phone,
                                Email: email,
                                Address: address,
                                PackageName: pack,
                                Method: paymentMethod,
                                Type: payment,
                                ArriveDate: arriveDate.toDateString(),
                                DepartDate: departDate,
                                TotalPerson: totalPerson,
                                status: status,
                                paymentStatus: pStatus,
                                Price: price,
                            });

                            db.collection('RecentActivities').add({
                                Name: adminName,
                                Action: 'Added a Booking',
                                Date: date,
                            }).catch((error) => {
                                console.log(error);
                            });

                            console.log(date);
                            alert('Upload Success!');
                            setProgress(0);
                            setPhoto(null);
                            setFname('');
                            setLname('');
                            setPaymentMethod('GCash');
                            setPhone('');
                            setEmail('');
                            setAddress('');
                            setPack('Package 1');
                            setPayment('Full Payment');
                            setArriveDate(null);
                            setDepartDate(null);
                            setTotalPerson('');
                            history.push('/allbookings')
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            );

        }
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Admin - Add Booking</title>
                <meta
                    name="description"
                    content="MREP Add Booking Page. Optional Page for manual adding of bookings"
                    data-react-helmet="true"
                />
                <meta
                    property="og:description"
                    content="MREP Add Booking Page. Optional Page for manual adding of bookings"
                    data-react-helmet="true"
                />
                <meta
                    name="keywords"
                    content="Resort, Bulacan, Bustos, Mikaellas"
                    data-react-helmet="true"
                />
                <meta
                    property="og:title"
                    content="Mikaella's Resort and Events Place"
                    data-react-helmet="true"
                />
            </Helmet>
            <Box sx={style.AddBookingsContainer}>
                <Typography sx={style.AddBookingHeader}>Add Booking</Typography>
                <Box sx={style.AddProgress}>
                    <progress
                        className="upload__progress"
                        value={progress}
                        max="100"
                    />
                </Box>
                <Box sx={style.AddBookingContent}>
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
                                <InputLabel id="pMethod">Payment Method</InputLabel>
                                <Select
                                    labelid="pMethod"
                                    id="pMethod"
                                    value={paymentMethod}
                                    label="pMethod"
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value);
                                    }}
                                    size='small'
                                >
                                    <MenuItem value='GCash'>Gcash</MenuItem>
                                    <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
                                </Select>
                            </Box>
                        </Box>
                        <Box sx={style.LineThree}>
                            <Box sx={style.InputLabel}>
                                <InputLabel id="Upload_Photo">Upload Proof of Payment</InputLabel>
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
                                    <MenuItem value='Phase 1'>Phase 1</MenuItem>
                                    <MenuItem value='Phase 2'>Phase 2</MenuItem>
                                </Select>
                            </Box>
                            <Box sx={style.InputLabel}>
                                <InputLabel id="RoomType">Select Payment Type</InputLabel>
                                <Select
                                    labelid="RoomType"
                                    id="room"
                                    value={payment}
                                    label="Room"
                                    onChange={(e) => {
                                        setPayment(e.target.value);
                                    }}
                                    size='small'
                                >
                                    <MenuItem value='Full Payment'>Full Payment</MenuItem>
                                    <MenuItem value='Half Payment'>Half Payment</MenuItem>
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
                                <InputLabel id="RoomType">Select Tour Time</InputLabel>
                                <Select
                                    labelid="RoomType"
                                    id="room"
                                    value={departDate}
                                    label="Room"
                                    onChange={(e) => {
                                        setDepartDate(e.target.value);
                                    }}
                                    size='small'
                                >
                                    <MenuItem value='Day Tour'>Day Tour</MenuItem>
                                    <MenuItem value='Overnight'>Overnight</MenuItem>
                                    <MenuItem value='22 Hours'>22 Hours</MenuItem>
                                </Select>
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
                                <InputLabel id="Note">Price</InputLabel>
                                <TextField
                                    labelid='Note'
                                    id='note'
                                    className='note'
                                    placeholder='Price'
                                    variant='outlined'
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={style.AddButton}>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={handleUpload}
                            >
                                Add Booking
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </HelmetProvider>
    )
}
