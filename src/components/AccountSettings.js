import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    textFieldPass: {
        width: '310px',
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

export default function AccountSettings(props) {

    const [showPass, setShowPass] = useState('password');

    const handleShowPass = () => {
        if (showPass === 'text') {
            setShowPass('password');

        } else if (showPass === 'password') {
            setShowPass('text');
        }
    }

    if (props.show === false) {
        return <Box></Box>
    } else if (props.show === true) {
        return (
            <Box sx={style.GeneralSettingsContainer}>
                <Box sx={style.GeneralHeader}>
                    <Typography sx={style.GeneralText}>Account Settings</Typography>
                    <Typography sx={style.GeneralSubtext}>These settings helps you modify your account settings.</Typography>
                </Box>
                <Box sx={style.GeneralSettingsContent}>
                    <Box sx={style.GLineOne}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Email</Typography>
                            <Typography sx={style.GSetSubtext}>Specify your Email.</Typography>
                        </Box>
                        <TextField
                            sx={style.textFields}
                            id='Email'
                            className='email'
                            placeholder='Email'
                            variant='outlined'
                            size='small'
                        />
                    </Box>
                    <Box sx={style.GLineTwo}>
                        <Box sx={style.GSetAllText}>
                            <Typography sx={style.GSetText}>Password</Typography>
                            <Typography sx={style.GSetSubtext}>Specify your Password.</Typography>
                        </Box>
                        <Box sx={style.Password}>
                            <TextField
                                sx={style.textFieldPass}
                                type={showPass}
                                id='Password'
                                className='pass'
                                placeholder='Password'
                                variant='outlined'
                                size='small'
                            />
                            <Tooltip title='Show Password'>
                                <IconButton>
                                    <VisibilityIcon onClick={handleShowPass} />
                                </IconButton>
                            </Tooltip>
                        </Box>
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
    }
}
