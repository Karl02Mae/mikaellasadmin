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
    { field: 'id', headerName: 'No.', width: 80 },

    {
        field: 'user',
        headerName: 'User',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 290,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    { field: 'lastpac', headerName: 'Last Package', width: 200 },
    { field: 'num', headerName: 'Number', width: 200 },
    { field: 'ver', headerName: 'Verified', width: 130 },
    { field: 'lastcheckout', headerName: 'Last Checkout', width: 180 },
    { field: 'addicon', headerName: <AddIcon />, width: 90 },
];

const rows = [
    { id: 1, lastName: 'Walker', firstName: 'Sharon',  lastpac: 'Package 1', num: '09222222', ver: 'Email', lastcheckout: '01 January 2022'  },
    { id: 2, lastName: 'Walker', firstName: 'Sharon',  lastpac: 'Wedding', num: '09222222', ver: 'Email', lastcheckout: '01 January 2022'  },
    { id: 3, lastName: 'Walker', firstName: 'Sharon',  lastpac: 'Package 2', num: '09222222', ver: 'Email', lastcheckout: '01 January 2022'  },
    { id: 4, lastName: 'Walker', firstName: 'Sharon',  lastpac: 'Starter', num: '09222222', ver: 'Email', lastcheckout: '01 January 2022'  },
    { id: 5, lastName: 'Walker', firstName: 'Sharon',  lastpac: 'Package 1', num: '09222222', ver: 'Email', lastcheckout: '01 January 2022'  },
];

const style = {
    ExpensesContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    ExpensesHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    ExpensesLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    ExpensesRight: {
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
    ExpensesListContainer: {
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

export default function Customers() {
    return (
        <Box sx={style.ExpensesContainer}>
            <Box sx={style.ExpensesHeaderContainer}>
                <Box sx={style.ExpensesLeft}>
                    <Typography sx={style.BookListText}>Customer's List</Typography>
                    <Typography sx={style.TotalBookText}>You have total 2,595 customer's.</Typography>
                </Box>
                <Box sx={style.ExpensesRight}>
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

                <Box sx={style.ExpensesListContainer}>

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
