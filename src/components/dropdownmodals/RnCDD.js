import React from 'react';
import './RnCDD.css';
import { Link } from 'react-router-dom';
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
                <Link to='/allroomsandcottages'>
                    <Box className='AddRnC'>
                        <Typography>All Rooms & Cottages</Typography>
                    </Box>
                </Link>
                {/* <Link to='/roomsandcottagestype'>
                    <Box className='EditRnC'>
                        <Typography>Rooms & Cottages Type</Typography>
                    </Box>
                </Link> */}
            </Box>
        )
    }
}
