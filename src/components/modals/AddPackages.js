import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';
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
    InputLabel: {
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content',
        marginRight: 2,
        marginBottom: 3,
    },
    Selection: {
        marginRight: 1,
        marginLeft: 1,
    },
}

export default function AddPackages(props) {
    const [pName, setPName] = useState('');
    const [price, setPrice] = useState('');
    const [accom, setAccom] = useState('');
    const [beds, setBeds] = useState('');
    const [caption, setCaption] = useState('');
    const [grill, setGrill] = useState(true);
    const [ac, setAc] = useState(true);
    const [wifi, setWifi] = useState(true);
    const [volley, setVolley] = useState(true);
    const [badmin, setBadmin] = useState(true);
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
            const uploadTask = storage.ref('PackageStorage/' + imageName).put(photo);

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
                        .ref("PackageStorage")
                        .child(imageName)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("Packages").add({
                                imageUrl: url,
                                Accomodation: accom,
                                Grill: grill,
                                AC: ac,
                                Wifi: wifi,
                                Volleyball: volley,
                                Badminton: badmin,
                                Beds: beds,
                                Caption: caption,
                                PackageName: pName,
                                Price: price,
                            });

                            db.collection('RecentActivities').add({
                                Name: adminName,
                                Action: 'Added a Package',
                                Date: date,
                            }).catch((error) => {
                                console.log(error);
                            });

                            console.log(date);
                            alert('Upload Success!');
                            setProgress(0);
                            setPhoto(null);
                            setAccom('');
                            setGrill(true);
                            setAc(true);
                            setWifi(true);
                            setVolley(true);
                            setBadmin(true);
                            setBeds('');
                            setCaption('');
                            setPName('');
                            setPrice('');
                            history.push('/packages')
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
                            <Typography sx={style.HeaderText}>Add Package</Typography>
                            <Typography sx={style.HeaderSubtext}>Add new Package here.</Typography>
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
                                <Typography sx={style.GSetText}>Package Name</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the name of the Package.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Package Name'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setPName(e.target.value) }}
                                value={pName}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Price</Typography>
                                <Typography sx={style.GSetSubtext}>Specify the Price of the Package.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                type='number'
                                className='hotName'
                                placeholder='Package Price'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setPrice(e.target.value) }}
                                value={price}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Accomodation</Typography>
                                <Typography sx={style.GSetSubtext}>Specify Accomodation Range.</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='e.g. 5 - 10'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setAccom(e.target.value) }}
                                value={accom}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Beds</Typography>
                                <Typography sx={style.GSetSubtext}>Specify Amount of Beds</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Bed Amount'
                                variant='outlined'
                                size='small'
                                onChange={(e) => { setBeds(e.target.value) }}
                                value={beds}
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Caption</Typography>
                                <Typography sx={style.GSetSubtext}>Specify Caption for Package</Typography>
                            </Box>
                            <TextField
                                sx={style.textFields}
                                id='HotelName'
                                className='hotName'
                                placeholder='Caption'
                                variant='outlined'
                                multiline
                                rows={2}
                                maxRows={8}
                                size='small'
                                onChange={(e) => { setCaption(e.target.value) }}
                                value={caption}
                            />
                        </Box>
                        <InputLabel id="StatusType">Ammenities</InputLabel>
                        <Box sx={style.InputLabel}>
                            <Select
                                sx={style.Selection}
                                labelid="StatusType"
                                id="status"
                                value={grill}
                                label="status"
                                onChange={(e) => {
                                    setGrill(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value={true}>Grill</MenuItem>
                                <MenuItem value={false}>No Grill</MenuItem>
                            </Select>
                            <Select
                                sx={style.Selection}
                                labelid="StatusType"
                                id="status"
                                value={ac}
                                label="status"
                                onChange={(e) => {
                                    setAc(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value={true}>AC</MenuItem>
                                <MenuItem value={false}>No AC</MenuItem>
                            </Select>
                            <Select
                                sx={style.Selection}
                                labelid="StatusType"
                                id="status"
                                value={wifi}
                                label="status"
                                onChange={(e) => {
                                    setWifi(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value={true}>Wifi</MenuItem>
                                <MenuItem value={false}>No Wifi</MenuItem>
                            </Select>
                            <Select
                                sx={style.Selection}
                                labelid="StatusType"
                                id="status"
                                value={volley}
                                label="status"
                                onChange={(e) => {
                                    setVolley(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value={true}>Volleyball</MenuItem>
                                <MenuItem value={false}>No Volleyball</MenuItem>
                            </Select>
                            <Select
                                sx={style.Selection}
                                labelid="StatusType"
                                id="status"
                                value={badmin}
                                label="status"
                                onChange={(e) => {
                                    setBadmin(e.target.value);
                                }}
                                size='small'
                            >
                                <MenuItem value={true}>Badminton</MenuItem>
                                <MenuItem value={false}>No Badminton</MenuItem>
                            </Select>
                        </Box>
                        <Button
                            sx={style.UploadButton}
                            variant='contained'
                            color='secondary'
                            onClick={handleUpload}
                        >
                            Add Package
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}
