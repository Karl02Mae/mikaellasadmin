import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../components/utils/firebase';
import { HelmetProvider, Helmet } from 'react-helmet-async';

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

export default function Recent(props) {
    const [dbData, setDbData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
        db.collection('RecentActivities').orderBy('Date', 'desc').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().Name,
                date: doc.data().Date,
                action: doc.data().Action,
            })))
        })
    }, []);


    const columns = [
        { field: 'id', headerName: 'Action ID', width: 250 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'action', headerName: 'Action', width: 350 },
        { field: 'date', headerName: 'Date', width: 250 },
    ];

    return (
        <HelmetProvider>
            <Box sx={style.InvoiceListContainer}>
                <Helmet>
                    <title>Admin - Recent Activities</title>
                    <meta
                        name="description"
                        content="Welcome to Mikaella's Resort and Events Place - Admin Site!. "
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:description"
                        content="Welcome to Mikaella's Resort and Events Place - Admin Site!."
                        data-react-helmet="true"
                    />
                    <meta
                        name="keywords"
                        content="Bulacan, Bustos, Resort, Mikaellas"
                        data-react-helmet="true"
                    />
                    <meta
                        property="og:title"
                        content="Mikaella's Resort and Events Place"
                        data-react-helmet="true"
                    />
                </Helmet>
                <Box sx={style.InvoiceListHeaderContainer}>
                    <Box sx={style.InvoiceListLeft}>
                        <Typography sx={style.BookListText}>Recent Activities</Typography>
                    </Box>
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
                                                db.collection('RecentActivities').doc(selectedIDs).delete().then(() => {
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
                        </Box>
                    </Box>

                    <Box sx={style.InvoiceListListContainer}>

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
        </HelmetProvider>
    )
}
