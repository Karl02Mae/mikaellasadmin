import React from 'react';
import './RDD.css';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const style = {
    RepDDContainer: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
    }
}

export default function ReportsDropDown(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box sx={style.RepDDContainer}>
                <Link to='/expenses'>
                    <Box className='expenses'>
                        <Typography>Expenses</Typography>
                    </Box>
                </Link>
                <Link to='/bookingreport'>
                    <Box className='bookingreport'>
                        <Typography>Booking</Typography>
                    </Box>
                </Link>
            </Box>
        )
    }
}
