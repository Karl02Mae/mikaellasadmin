import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
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

export default function AddPreviewImage(props) {
    const [photo, setPhoto] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const [photo3, setPhoto3] = useState(null);
    const [photo4, setPhoto4] = useState(null);
    const [progress, setProgress] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const [progress4, setProgress4] = useState(0);
    const [comp, setComp] = useState(false);
    const [comp2, setComp2] = useState(false);
    const [comp3, setComp3] = useState(false);
    const [comp4, setComp4] = useState(false);


    const history = useHistory('');


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
            console.log(photo);
        }
    };

    const handleChange2 = (e) => {
        if (e.target.files[0]) {
            setPhoto2(e.target.files[0]);
            console.log(photo2);
        }
    };

    const handleChange3 = (e) => {
        if (e.target.files[0]) {
            setPhoto3(e.target.files[0]);
            console.log(photo3);
        }
    };

    const handleChange4 = (e) => {
        if (e.target.files[0]) {
            setPhoto4(e.target.files[0]);
            console.log(photo4);
        }
    };

    useEffect(() => {
        if (comp === true && comp2 === true && comp3 === true && comp4 === true) {
            alert('Upload Success!');
            setProgress(0);
            setProgress2(0);
            setProgress3(0);
            setProgress4(0);
            setComp(false);
            setComp2(false);
            setComp3(false);
            setComp4(false);
            props.onClose();
        }
    }, [comp, comp2, comp3, comp4, props])

    const handleUpload = () => {
        //FOR IMAGE 2
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
                            db.collection("Packages").doc(props.ids).update({
                                imageUrl2: url,
                            });

                            setPhoto(null);
                            setComp(true);
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            );
        }
        //FOR IMAGE 3
        if (photo2 === null) {
            alert("No Image Selected!");
        } else {
            const imageName2 = photo2.name;
            const uploadTask2 = storage.ref('PackageStorage/' + imageName2).put(photo2);
            uploadTask2.on(
                "state_changed",
                (snapshot) => {
                    //progress function...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress2(progress);
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
                        .child(imageName2)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("Packages").doc(props.ids).update({
                                imageUrl3: url,
                            });

                            setPhoto2(null);
                            setComp2(true);
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            );
        }
        //FOR IMAGE 4
        if (photo3 === null) {
            alert("No Image Selected!");
        } else {
            const imageName3 = photo3.name;
            const uploadTask3 = storage.ref('PackageStorage/' + imageName3).put(photo3);
            uploadTask3.on(
                "state_changed",
                (snapshot) => {
                    //progress function...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress3(progress);
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
                        .child(imageName3)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("Packages").doc(props.ids).update({
                                imageUrl4: url,
                            });

                            setPhoto3(null);
                            setComp3(true);
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            );
        }
        //FOR IMAGE 5
        if (photo4 === null) {
            alert("No Image Selected!");
        } else {
            const imageName4 = photo4.name;
            const uploadTask4 = storage.ref('PackageStorage/' + imageName4).put(photo4);
            uploadTask4.on(
                "state_changed",
                (snapshot) => {
                    //progress function...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress4(progress);
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
                        .child(imageName4)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db...
                            db.collection("Packages").doc(props.ids).update({
                                imageUrl5: url,
                            });

                            setPhoto4(null);
                            setComp4(true);
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
                            <Typography sx={style.HeaderText}>Add Preview Image</Typography>
                            <Typography sx={style.HeaderSubtext}>Add new preview images for Package here.</Typography>
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
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Preview 2</Typography>
                                <Typography sx={style.GSetSubtext}>Add image for Preview 2.</Typography>
                            </Box>
                            <input
                                className="imageupload__button"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleChange}
                            />
                            <progress
                                className="upload__progress_PI"
                                value={progress}
                                max="100"
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Preview 3</Typography>
                                <Typography sx={style.GSetSubtext}>Add image for Preview 3.</Typography>
                            </Box>
                            <input
                                className="imageupload__button"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleChange2}
                            />
                            <progress
                                className="upload__progress_PI"
                                value={progress2}
                                max="100"
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Preview 4</Typography>
                                <Typography sx={style.GSetSubtext}>Add image for Preview 4.</Typography>
                            </Box>
                            <input
                                className="imageupload__button"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleChange3}
                            />
                            <progress
                                className="upload__progress_PI"
                                value={progress3}
                                max="100"
                            />
                        </Box>
                        <Box sx={style.GLineOne}>
                            <Box sx={style.GSetAllText}>
                                <Typography sx={style.GSetText}>Preview 5</Typography>
                                <Typography sx={style.GSetSubtext}>Add image for Preview 5.</Typography>
                            </Box>
                            <input
                                className="imageupload__button"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleChange4}
                            />
                            <progress
                                className="upload__progress_PI"
                                value={progress4}
                                max="100"
                            />
                        </Box>
                        <Button
                            sx={style.UploadButton}
                            variant='contained'
                            color='secondary'
                            onClick={() => { handleUpload(); }}
                        >
                            Add Preview Images
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}
