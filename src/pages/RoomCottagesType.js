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
    { field: 'id', headerName: '#', width: 80 },
    { field: 'roomtype', headerName: 'Room Type', width: 250 },
    { field: 'shortcode', headerName: 'Short Code', width: 250 },
    { field: 'norooms', headerName: 'No. of Rooms', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },
    { field: 'addicon', headerName: <AddIcon />, width: 90 },
];

const rows = [
    { id: 1, roomtype: 'Family Room', shortcode: 'FR', norooms: '5', status: 'Active'  },
    { id: 2, roomtype: 'Function Room', shortcode: 'FUR', norooms: '1', status: 'Active' },
    { id: 3, roomtype: 'Couple Room', shortcode: 'CR', norooms: '1', status: 'Active'  }, 
    { id: 4, roomtype: 'Nipa Cottage', shortcode: 'NC', norooms: '3', status: 'Free'  },
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
        fontSize: 'large'
    },
    TotalBookText: {
        fontWeight: '500',
        fontSize: 'small',
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

export default function RoomsCottagesType() {
    return (
        <Box sx={style.AllRoomsandCottagesContainer}>
            <Box sx={style.AllRoomsandCottagesHeaderContainer}>
                <Box sx={style.AllRoomsandCottagesLeft}>
                    <Typography sx={style.BookListText}>Room and Cottages Type</Typography>
                    <Typography sx={style.TotalBookText}>Here is our Various room and cottages type.</Typography>
                </Box>
                <Box sx={style.AllRoomsandCottagesRight}>
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
