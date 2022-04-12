import React from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReportIcon from '@mui/icons-material/Report';


const style = {
    AllBookingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    AllBookingsHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    AllBookingsLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    AllBookingsRight: {
        display: 'flex',
    },
    AddBookButton: {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '7px',
        border: '1px solid #591934',
        height: 'fit-content',
        paddingLeft: 1,
        paddingRight: 1,
    },
    BookListText: {
        fontWeight: 'bold',
        fontSize: 'large'
    },
    TotalBookText: {
        fontWeight: '500',
        fontSize: 'small',
    },
    ReportsButton: {
        display: 'flex',
        padding: '1px',
        alignItems: 'center',
        border: '1.5px solid black',
        borderRadius: '5px',
        height: 'fit-content',
        marginLeft: 1,
        backgroundColor: '#E7CE95',
    },
    ReportsText: {
        fontWeight: '500',
        fontSize: '12px',
    },
    AllBookingsListContainer: {
        backgroundColor: '#f7f7f7',
        height: '87%',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1px solid black',
        borderRadius: '10px',
    }
}

export default function AllBookings() {
    return (
        <Box sx={style.AllBookingsContainer}>
            <Box sx={style.AllBookingsHeaderContainer}>
                <Box sx={style.AllBookingsLeft}>
                    <Typography sx={style.BookListText}>Booking List</Typography>
                    <Typography sx={style.TotalBookText}>You have 424 Total Bookings</Typography>
                </Box>
                <Box sx={style.AllBookingsRight}>
                    <Box sx={style.AddBookButton}>
                        <AddIcon sx={style.AddBookIcon} />
                    </Box>
                    <Box sx={style.ReportsButton}>
                        <ReportIcon />
                        <Typography sx={style.ReportsText}>Reports</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={style.AllBookingsListContainer}>

            </Box>
        </Box>
    )
}
