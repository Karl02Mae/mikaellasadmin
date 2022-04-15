import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

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
}

export default function GeneralSettings(props) {
    if (props.show === false) {
        return (
            <Box sx={style.GeneralSettingsContainer}>
                <Box sx={style.GeneralHeader}>
                    <Typography sx={style.GeneralText}>General Settings</Typography>
                    <Typography sx={style.GeneralSubtext}>These settings helps you modify site settings.</Typography>
                </Box>
                <Box sx={style.GeneralSettingsContent}>
                    <Box sx={style.GLineOne}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Site Name</Typography>
                            <Typography sx={style.GSetSubtext}>Specify the name of your site.</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='HotelName'
                            className='hotName'
                            placeholder='Site Name'
                            variant='outlined'
                            size='small'
                        />
                    </Box>
                    <Box sx={style.GLineTwo}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Site Logo</Typography>
                            <Typography sx={style.GSetSubtext}>The logo of your site.</Typography>
                        </Box>
                        <input
                            labelid='Upload_Photo'
                            className="imageupload__button"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={''}
                        />
                    </Box>
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
                        />
                    </Box>
                    <Box sx={style.GLineFour}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Copyright</Typography>
                            <Typography sx={style.GSetSubtext}>Copyright information of your Resort.</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='copyright'
                            className='copyright'
                            placeholder='Copyright'
                            variant='outlined'
                            size='small'
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
                        />
                    </Box>
                    <Box sx={style.GUpdate}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={''}
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
