import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './BookingsDropDown.css';

const style = {
    BookingsDDContainer: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
    }
}

export default function BookingsDropDown(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box sx={style.BookingsDDContainer}>
                <Link to='/allbookings'>
                    <Box className='AllBookingsText'>
                        <Typography>All Bookings</Typography>
                    </Box>
                </Link>
                <Link to='/addbookings'>
                    <Box className='AddBookingsText'>
                        <Typography>Add Booking</Typography>
                    </Box>
                </Link>
                <Link to='/editbookings'>
                    <Box className='EditBookingsText'>
                        <Typography>Edit Booking</Typography>
                    </Box>
                </Link>
            </Box>
        )
    }
}
