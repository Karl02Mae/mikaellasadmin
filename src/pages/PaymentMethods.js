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
    { field: 'id', headerName: 'SL.', width: 80 },

    {
        field: 'name',
        headerName: 'Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 230,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    { field: 'payname', headerName: 'Payment Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 290 },
    { field: 'num', headerName: 'Number', width: 160 },
    { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
    { id: 1, lastName: 'Lopez', firstName: 'Mikaella',  payname: 'Gcash', email: 'mikaellaresortand eventsplace.gmail.com', num: '09222222', status: 'Active'  },
    { id: 2, lastName: 'Lopez', firstName: 'Mikaella',  payname: 'Paypal', email: 'mikaellaresortand eventsplace.gmail.com', num: '09222222', status: 'Active'  },
    { id: 3, lastName: 'Lopez', firstName: 'Mikaella',  payname: 'Paymaya', email: 'mikaellaresortand eventsplace.gmail.com', num: '09222222', status: 'Active'  },
    { id: 4, lastName: 'Lopez', firstName: 'Mikaella',  payname: 'Credit Card', email: 'mikaellaresortand eventsplace.gmail.com', num: '09222222', status: 'Active'  },
];

const style = {
    PaymentMethodsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    PaymentMethodsHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    PaymentMethodsLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    PaymentMethodsRight: {
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
    PaymentMethodsListContainer: {
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

export default function PaymentMethods() {
    return (
        <Box sx={style.PaymentMethodsContainer}>
            <Box sx={style.PaymentMethodsHeaderContainer}>
                <Box sx={style.PaymentMethodsLeft}>
                    <Typography sx={style.BookListText}>Payment Methods</Typography>
                    <Typography sx={style.TotalBookText}>Here is the procedure of payment.</Typography>
                </Box>
                <Box sx={style.PaymentMethodsRight}>
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

                <Box sx={style.PaymentMethodsListContainer}>

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
