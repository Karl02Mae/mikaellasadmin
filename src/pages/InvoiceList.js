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
    { field: 'id', headerName: 'Payment ID', width: 250 },
    { field: 'date', headerName: 'Date', width: 250 },
    { field: 'amount', headerName: 'Amount', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },
    
];

const rows = [
    { id: 74652, date: '23 Jan 2019, 10:45pm', amount: '5000', status: 'Complete' },
    { id: 25698, date: '23 Jan 2019, 10:45pm', amount: '5000', status: 'Pending' },
    { id: 12345, date: '23 Jan 2019, 10:45pm', amount: '5000', status: 'Pending' },
    { id: 45234, date: '23 Jan 2019, 10:45pm', amount: '5000', status: 'Complete' },
    { id: 54785, date: '23 Jan 2019, 10:45pm', amount: '5000', status: 'Complete' },
];

const style = {
    InvoiceListContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    InvoiceListHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    InvoiceListLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    InvoiceListRight: {
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
    InvoiceListListContainer: {
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

export default function InvoiceList() {
    return (
        <Box sx={style.InvoiceListContainer}>
            <Box sx={style.InvoiceListHeaderContainer}>
                <Box sx={style.InvoiceListLeft}>
                    <Typography sx={style.BookListText}>All Invoices</Typography>
                    <Typography sx={style.TotalBookText}>You have total 937 invoices.</Typography>
                </Box>
                <Box sx={style.InvoiceListRight}>
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

                <Box sx={style.InvoiceListListContainer}>

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
