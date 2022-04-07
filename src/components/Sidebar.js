import { Box, Typography } from '@mui/material';
import React from 'react';
import Logo from '../img/LogoMK.png';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';

const style = {
    SidebarContainer: {
        display: 'flex',
        flex: 0.2,
        flexDirection: 'column',
        height: '100%',
    },
    SidebarHeader: {
        display: 'flex',
        backgroundColor: '#591934',
        borderBottom: '1px solid white',
        height: '70px',
        color:'white',
        alignItems: 'center',
        textAlign: 'center',
        paddingLeft: 1,
    },
    SidebarContents: {
        backgroundColor: '#591934',
        height: '89.8vh',
    },
}

export default function Sidebar() {
    return (
        <Box sx={style.SidebarContainer}>
            <Box sx={style.SidebarHeader}>
                <MenuIcon />
                <img src={Logo} alt="MKLogo" className='MKLogo'/>
                <Typography >Mikaella's Resort and Events Place</Typography>
            </Box>
            <Box sx={style.SidebarContents}>
                <Typography>Dashboard</Typography>
                 {/**Sample Push */}
            </Box>
        </Box>
    )
}
