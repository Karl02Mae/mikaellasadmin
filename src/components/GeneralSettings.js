import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { db } from '../utils/firebase';

const style = {
    GeneralSettingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
    },
    GeneralHeader: {
        display: 'flex',
        flexDirection: 'column',
    },
    GeneralSettingsContent: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 5,
    },
    GeneralText: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#454545',
    },
    GeneralSubtext: {
        fontWeight: '500',
        fontSize: '15px',
        color: 'gray',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GLineTwo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GLineThree: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GLineFour: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GLineFive: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GLineSix: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GLineSeven: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GLineEight: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
    },
    GUpdate: {
        marginTop: 1,
    }
}

export default function GeneralSettings(props) {
    const [dbData, setDbData] = useState([]);
    const [messenger, setMessenger] = useState('');
    const [rAddress, setRAddress] = useState('');
    const [mSite, setMSite] = useState('');
    const [fb, setFb] = useState('');
    const [ig, setIg] = useState('');
    const [ohStart, setOhStart] = useState('');
    const [ohEnd, setOhEnd] = useState('');
    const ids = 'zwGD9OeGb5bPZ32pJJg9';

    useEffect(() => {
        db.collection('GeneralSettings').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, []);

    const handleSearch = () => {
        dbData.map(({ id, data }) => {
            if (id === ids) {
                setMessenger(data.Messenger);
                setRAddress(data.RAddress);
                setMSite(data.MSite);
                setFb(data.FB);
                setIg(data.IG);
                setOhStart(data.OHStart);
                setOhEnd(data.OHEnd);
            }
            return <Box key={id}></Box>
        })
    }

    const handleUpdate = () => {
        db.collection("GeneralSettings").doc(ids).update({
            Messenger: messenger,
            RAddress: rAddress,
            MSite: mSite,
            FB: fb,
            IG: ig,
            OHStart: ohStart,
            OHEnd: ohEnd,
        }).catch((error) => {
            console.log(error);
        });

        alert('Successfully Updated');
        setMessenger('');
        setRAddress('');
        setMSite('');
        setFb('');
        setIg('');
        setOhStart('');
        setOhEnd('');
    }


    if (props.show === false) {
        return (
            <Box sx={style.GeneralSettingsContainer}>
                <Box sx={style.GeneralHeader}>
                    <Typography sx={style.GeneralText}>General Settings</Typography>
                    <Typography sx={style.GeneralSubtext}>These settings helps you modify site settings.</Typography>
                </Box>
                <Box sx={style.GeneralSettingsContent}>
                    <Box sx={style.GLineThree}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Resort Address</Typography>
                            <Typography sx={style.GSetSubtext}>Specify the address of your Resort</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='RAddress'
                            className='RAdress'
                            placeholder='Resort Address'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                setRAddress(e.target.value);
                            }}
                            value={rAddress}
                        />
                    </Box>
                    <Box sx={style.GLineFive}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Main Site</Typography>
                            <Typography sx={style.GSetSubtext}>Specify the URL of your Main Site.</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='mainSite'
                            className='mainSite'
                            placeholder='Main Site'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                setMSite(e.target.value);
                            }}
                            value={mSite}
                        />
                    </Box>
                    <Box sx={style.GLineOne}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Office Hours Start</Typography>
                            <Typography sx={style.GSetSubtext}>Specify Hour Start</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='HotelName'
                            className='hotName'
                            placeholder='Hour Start'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                setOhStart(e.target.value)
                            }}
                            value={ohStart}
                        />
                    </Box>
                    <Box sx={style.GLineOne}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Office Hours End</Typography>
                            <Typography sx={style.GSetSubtext}>Specify Hour End</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='HotelName'
                            className='hotName'
                            placeholder='Hour End'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                setOhEnd(e.target.value)
                            }}
                            value={ohEnd}
                        />
                    </Box>
                    <Box sx={style.GLineSix}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Facebook</Typography>
                            <Typography sx={style.GSetSubtext}>Specify the URL of your Facebook Page.</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='Facebook'
                            className='Facebook'
                            placeholder='Facebook'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                setFb(e.target.value)
                            }}
                            value={fb}
                        />
                    </Box>
                    <Box sx={style.GLineSeven}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Instagram</Typography>
                            <Typography sx={style.GSetSubtext}>Specify the URL of your Instagram Account.</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='InstaG'
                            className='InstaG'
                            placeholder='Instagram'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                setIg(e.target.value);
                            }}
                            value={ig}
                        />
                    </Box>
                    <Box sx={style.GLineOne}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Messenger</Typography>
                            <Typography sx={style.GSetSubtext}>Specify Messenge Link</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='HotelName'
                            className='hotName'
                            placeholder='Messenger Link'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                setMessenger(e.target.value)
                            }}
                            value={messenger}
                        />
                    </Box>
                    <Box sx={style.GUpdate}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={handleSearch}
                        >
                            Search Previous Data
                        </Button>
                    </Box>
                    <Box sx={style.GUpdate}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    } else if (props.show === true) {
        return <Box></Box>
    }
}
