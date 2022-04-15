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
    { field: 'id', headerName: 'ID', width: 150 },

    {
        field: 'suppliername',
        headerName: 'Supplier Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 280,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    { field: 'desc', headerName: 'Description', width: 270 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 180 },
    { field: 'addicon', headerName: <AddIcon />, width: 90 },
];

const rows = [
    { id: 101, lastName: 'Walker', firstName: 'Sharon',  desc: 'Internet Bill', date: '01 January 2022', amount: '5000' },
    { id: 102, lastName: 'Walker', firstName: 'Sharon',  desc: 'Maintenance Bill', date: '01 January 2022', amount: '5000' },
    { id: 103, lastName: 'Walker', firstName: 'Sharon',  desc: 'Internet Bill', date: '01 January 2022', amount: '5000' },
    { id: 104, lastName: 'Walker', firstName: 'Sharon',  desc: 'Internet Bill', date: '01 January 2022', amount: '5000' },
    { id: 105, lastName: 'Walker', firstName: 'Sharon',  desc: 'Internet Bill', date: '01 January 2022', amount: '5000' },
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

export default function Expenses() {
    return (
        <Box sx={style.ExpensesContainer}>
            <Box sx={style.ExpensesHeaderContainer}>
                <Box sx={style.ExpensesLeft}>
                    <Typography sx={style.BookListText}>Expenses List</Typography>
                    <Typography sx={style.TotalBookText}>Here is our Various expenses list.</Typography>
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
