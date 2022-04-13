import React from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterListIcon from '@mui/icons-material/FilterList';


const columns = [
    { field: 'id', headerName: 'Room ID.', width: 150 },
    { field: 'roomtype', headerName: 'Room Type', width: 280 },
    { field: 'from', headerName: 'From', width: 270 },
    { field: 'to', headerName: 'To', width: 200 },
    { field: 'totalamount', headerName: 'Total Amount', width: 180 },
    { field: 'addicon', headerName: <AddIcon />, width: 90 },
];

const rows = [
    { id: 565601, roomtype: 'Family Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 658742, roomtype: 'Function Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 658882, roomtype: 'Couple Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 659982, roomtype: 'Family Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 657782, roomtype: 'Nipa Cottage', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 653482, roomtype: 'Family Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 643482, roomtype: 'Couple Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 743482, roomtype: 'Function Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 843482, roomtype: 'Family Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
    { id: 943482, roomtype: 'Couple Room', from: '01 January 2022', to: '01 February 2022', totalamount: '5000' },
];

const style = {
    BookingContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    BookingHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    BookingLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    BookingRight: {
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
    BookingReportContainer: {
        backgroundColor: 'white',
        height: '87%',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    ButtonContainer: {
        display: 'flex',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    leftContainer: {
        marginLeft: '-3px',
        flexDirection: 'column',
        borderRadius: '5px',
        width: '1100px',
        backgroundColor: '#f7f7f7',
    },
    ButtonRight: {
        display: 'flex',
    },
    SearchButton: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    rightContainer: {
        flexDirection: 'column',
        borderRadius: '5px',
        width: '90px',
        backgroundColor: '#f7f7f7',
    },
    FilSetButton: {
        display: 'flex',
    },
    BookListContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }
}

export default function Booking() {
    return (
        <Box sx={style.BookingContainer}>
            <Box sx={style.BookingHeaderContainer}>
                <Box sx={style.BookingLeft}>
                    <Typography sx={style.BookListText}>Booking Report</Typography>
                    <Typography sx={style.TotalBookText}>Here is our booking report</Typography>
                </Box>
                <Box sx={style.BookingRight}>
                    <Box sx={style.AddBookButton}>
                        <AddIcon sx={style.AddBookIcon} />
                    </Box>
                </Box>
            </Box>

            <Box sx={style.BookListContainer}>
                <Box sx={style.ButtonContainer} >

                    <Box sx={style.leftContainer}>

                        <Box sx={style.ButtonRight}>
                            <Box sx={style.SearchButton}>
                                <Tooltip title="Search">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                    </Box>

                    <Box sx={style.rightContainer}>

                        <Box sx={style.FilSetButton} >

                            <Tooltip title="Filter list">
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Settings">
                                <IconButton>
                                    <SettingsIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                    </Box>


                </Box>

                <Box sx={style.BookingReportContainer}>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />

                </Box>
            </Box>
        </Box>
    )
}
