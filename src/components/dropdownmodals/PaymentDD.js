import React from 'react';
import './PDD.css';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const style = {
    PDDContainer: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
    }
}

export default function PaymentDD(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box sx={style.PDDContainer}>
                <Link to='/paymentmethods'>
                    <Box className='paymentmethods'>
                        <Typography>Payment Methods</Typography>
                    </Box>
                </Link>
                <Link to='/invoicelist'>
                    <Box className='invoicelist'>
                        <Typography>Invoice List</Typography>
                    </Box>
                </Link>
                {/* <Link to='/invoicedetails'>
                    <Box className='invoicedetails'>
                        <Typography>Invoice Details</Typography>
                    </Box>
                </Link> */}
            </Box>
        )
    }
}
