import React from 'react';
import './RnCDD.css';
import { Box, Typography } from '@mui/material';

const style = {
    RnCDDContainer: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
    }
}

export default function RnCDD(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box sx={style.RnCDDContainer}>
                <Box className='AddRnC'>
                    <Typography>All Rooms & Cottages</Typography>
                </Box>
                <Box className='EditRnC'>
                    <Typography>Rooms & Cottages Type</Typography>
                </Box>
            </Box>
        )
    }
}
