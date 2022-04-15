import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GeneralSettings from '../components/GeneralSettings';
import AccountSettings from '../components/AccountSettings';
import SettingsIcon from '@mui/icons-material/Settings';

const style = {
    SettingsContainer: {
        display: 'flex',
        height: '100%',
    },
    SettingsContent: {
        display: 'flex',
        height: '90%',
        width: '92%',
        border: '2px solid lightgray',
        borderRadius: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
    },
    SettingsLeft: {
        display: 'flex',
        flexDirection: 'column',
        borderRight: '2px solid lightgray',
        flex: '0.3',
    },
    SettingsTLeft: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '2px solid lightgray',
        flex: '0.2',
        padding: 2,
        paddingBottom: 0,
    },
    SettingsBLeft: {
        display: 'flex',
        flexDirection: 'column',
        flex: '0.8',
    },
    SettingsRight: {
        display: 'flex',
        flexDirection: 'column',
        flex: '0.7',
    },
    SettingsText: {
        fontWeight: 'bold',
        fontSize: '30px',
        color: '#454545',
    },
    SettingsSubtext: {
        fontWeight: '500',
        color: 'gray',
    },
    GeneralContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
        color: '#454545',
        cursor: 'pointer',
        transitionDuration: '500ms',
        "&:hover": {
            backgroundColor: 'rgba(0,0,0,0.2)',
            paddingLeft: 3,
        },
    },
    GenTop: {
        display: 'flex',
        alignItems: 'center',
        transitionDuration: '500ms',
    },
    AccountContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
        color: '#454545',
        cursor: 'pointer',
        transitionDuration: '500ms',
        "&:hover": {
            backgroundColor: 'rgba(0,0,0,0.2)',
            paddingLeft: 3,
        },
    }
}

export default function Settings() {

    const [selected, setSelected] = useState(false);

    return (
        <Box sx={style.SettingsContainer}>
            <Box sx={style.SettingsContent}>
                <Box sx={style.SettingsLeft}>
                    <Box sx={style.SettingsTLeft}>
                        <Typography sx={style.SettingsText}>Settings</Typography>
                        <Typography sx={style.SettingsSubtext}>Here you can change and edit your needs</Typography>
                    </Box>
                    <Box sx={style.SettingsBLeft}>

                        <Box sx={style.GeneralContainer} onClick={() => setSelected(false)} >
                            <Box sx={style.GenTop}>

                                {selected === false ? (
                                    <SettingsIcon sx={{ color: '#591934' }} />
                                ) : (
                                    <SettingsIcon />
                                )}
                                {selected === false ? (
                                    <Typography sx={{ color: '#591934' }}>General</Typography>
                                ) : (
                                    <Typography>General</Typography>
                                )}

                            </Box>
                            <Box>
                                {selected === false ? (
                                    <ArrowRightIcon sx={{ color: '#591934' }} />
                                ) : (
                                    <ArrowRightIcon />
                                )}

                            </Box>
                        </Box>

                        <Box sx={style.AccountContainer} onClick={() => setSelected(true)} >
                            <Box sx={style.GenTop}>

                                {selected === false ? (
                                    <AccountBoxIcon />
                                ) : (
                                    <AccountBoxIcon sx={{ color: '#591934' }} />
                                )}
                                {selected === false ? (
                                    <Typography>Account</Typography>
                                ) : (
                                    <Typography sx={{ color: '#591934' }}>Account</Typography>
                                )}

                            </Box>
                            <Box>
                                {selected === false ? (
                                    <ArrowRightIcon />
                                ) : (
                                    <ArrowRightIcon sx={{ color: '#591934' }} />
                                )}

                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={style.SettingsRight}>
                    {selected === false ? (
                        <GeneralSettings show={selected} />
                    ) : (
                        <AccountSettings show={selected} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}
