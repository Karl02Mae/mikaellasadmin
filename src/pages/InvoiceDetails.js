import React from 'react';
import { Box, Typography } from '@mui/material';

const style = {
    InvoiceDetailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    InvoiceDetailsHeader: {
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
    },
    InvoiceText: {
        fontWeight: 'bold',
        fontSize: '30px',
        color: '#454545',
    },
    InvoiceDateCreated: {
        fontWeight: '500',
        fontSize: 'small',
        color: 'gray',
    },
    InvoiceDetailsContent: {
        display: 'flex',
        
    },
}

export default function InvoiceDetails() {
    return (
        <Box sx={style.InvoiceDetailsContainer}>
            <Box sx={style.InvoiceDetailsHeader}>
                <Typography sx={style.InvoiceText}>Invoice #AB101</Typography>
                <Typography sx={style.InvoiceDateCreated}>Created at: 18-Dec-2021</Typography>
            </Box>
            <Box sx={style.InvoiceDetailsContent}>

            </Box>
        </Box>
    )
}
