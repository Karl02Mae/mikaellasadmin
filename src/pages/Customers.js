import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterListIcon from '@mui/icons-material/FilterList';

import { db } from '../utils/firebase';
import AddCustomers from '../components/modals/AddCustomers';


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
        cursor: 'pointer',
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

    const [dbData, setDbData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);


    useEffect(() => {
        db.collection('Customers').orderBy('Username', 'asc').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                no: doc.data().No,
                user: doc.data().Username,
                lastpack: doc.data().LastPackage,
                num: doc.data().Number,
                email: doc.data().Email,
                lastcheckout: doc.data().LastCheckout,
            })))
        })
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },

        {
            field: 'user',
            headerName: 'User',
            sortable: false,
            width: 200,
        },

        { field: 'lastpack', headerName: 'Last Package', width: 120 },
        { field: 'num', headerName: 'Number', width: 120 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'lastcheckout', headerName: 'Last Checkout', width: 180 },
    ];

    return (
        <Box sx={style.ExpensesContainer}>
            <Box sx={style.ExpensesHeaderContainer}>
                <Box sx={style.ExpensesLeft}>
                    <Typography sx={style.BookListText}>Customer's List</Typography>
                    <Typography sx={style.TotalBookText}>You have total 2,595 customer's.</Typography>
                </Box>
                <Box sx={style.ExpensesRight}>
                    <Box sx={style.AddBookButton}>
                        <AddIcon sx={style.AddBookIcon} onClick={() => setShow(true)} />
                    </Box>
                </Box>
            </Box>

            <Box>
                <AddCustomers show={show} onClose={() => setShow(false)} />
            </Box>

            <Box sx={style.BookListContainer}>
                <Box sx={style.ButtonContainer} >

                    <Box sx={style.leftContainer}>

                        <Tooltip title='Delete selected'>
                            <IconButton
                                onClick={() => {
                                    const selectedIDs = selectionModel.toString();
                                    console.log(selectedIDs);
                                    if (selectedIDs !== '') {
                                        if (window.confirm('Delete this Row?')) {
                                            db.collection('Customers').doc(selectedIDs).delete().then(() => {
                                                console.log('Successfully Deleted!');
                                            })
                                        }
                                    } else if (selectedIDs === '') {
                                        alert('Please select a row to delete!');
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

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
                        rows={dbData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        onSelectionModelChange={(ids) => {
                            setSelectionModel(ids);
                        }}
                    />

                </Box>
            </Box>
        </Box>
    )
}
