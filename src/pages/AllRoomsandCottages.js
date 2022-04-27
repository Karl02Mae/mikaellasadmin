import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterListIcon from '@mui/icons-material/FilterList';

import AddRnCModal from '../components/modals/AddRnCModal';


const columns = [
    { field: 'id', headerName: 'Room No.', width: 150 },
    { field: 'roomtype', headerName: 'Room Type', width: 250 },
    { field: 'acnonac', headerName: 'AC/Non AC', width: 180 },
    { field: 'bedcapacity', headerName: 'Bed Capacity', width: 180 },
    { field: 'rent', headerName: 'Rent', width: 160 },
    { field: 'status', headerName: 'Status', width: 160 },
    { field: 'addicon', headerName: <AddIcon />, width: 90 },
];

const rows = [
    { id: 101, roomtype: 'Family Room', acnonac: 'AC', bedcapacity: '5', rent: '5000', status: 'Booked' },
    { id: 102, roomtype: 'Function Room', acnonac: 'AC', bedcapacity: ' ', rent: '5000', status: 'Pending' },
    { id: 103, roomtype: 'Couple Room', acnonac: 'AC', bedcapacity: '1', rent: '5000', status: 'Booked' },
    { id: 104, roomtype: 'Family Room', acnonac: 'AC', bedcapacity: '10', rent: '5000', status: 'Open' },
    { id: 105, roomtype: 'Nipa Cottage', acnonac: 'None', bedcapacity: ' ', rent: 'Free', status: 'Free' },
    { id: 106, roomtype: 'Family Room', acnonac: 'AC', bedcapacity: '3', rent: '5000', status: 'Pending' },
    { id: 107, roomtype: 'Couple Room', acnonac: 'None', bedcapacity: '1', rent: '5000', status: 'Open' },
    { id: 108, roomtype: 'Function Room', acnonac: 'None', bedcapacity: ' ', rent: '5000', status: 'Booked' },
    { id: 109, roomtype: 'Family Room', acnonac: 'AC', bedcapacity: '5', rent: '5000', status: 'Paid' },
    { id: 100, roomtype: 'Couple Room', acnonac: 'None', bedcapacity: '2', rent: '5000', status: 'Booked' },
];

const style = {
    AllRoomsandCottagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    AllRoomsandCottagesHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    AllRoomsandCottagesLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    AllRoomsandCottagesRight: {
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
        fontSize: '30px',
        color: '#454545',
    },
    TotalBookText: {
        fontWeight: '500',
        fontSize: 'small',
        color: 'gray',
    },
    AllRoomsandCottagesListContainer: {
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

export default function AllRoomsandCottages() {

    const [show, setShow] = useState(false);

    return (
        <Box sx={style.AllRoomsandCottagesContainer}>
            <Box sx={style.AllRoomsandCottagesHeaderContainer}>
                <Box sx={style.AllRoomsandCottagesLeft}>
                    <Typography sx={style.BookListText}>Room and Cottages List</Typography>
                    <Typography sx={style.TotalBookText}>Here is our Various rooms and cottages.</Typography>
                </Box>
                <Box sx={style.AllRoomsandCottagesRight}>
                    <Tooltip title="Add Room/Cottage">
                        <IconButton onClick={() => setShow(true)}>
                            <Box sx={style.AddBookButton}>
                                <AddIcon sx={style.AddBookIcon} />
                            </Box>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={style.AddRnCModal}>
                <AddRnCModal show={show} onClose={() => setShow(false)} />
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

                <Box sx={style.AllRoomsandCottagesListContainer}>

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
