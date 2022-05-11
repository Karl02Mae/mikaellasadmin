import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterListIcon from '@mui/icons-material/FilterList';
import { db } from '../utils/firebase';
import { useHistory } from 'react-router-dom';


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

export default function AllBookings() {

    const [dbData, setDbData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const history = useHistory();

    const handlePush = () => {
        history.push('/addbookings');
    }

    useEffect(() => {
        db.collection('Bookings').orderBy('date', 'desc').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                Customer: doc.data().FName + ' ' + doc.data().LName,
                Package: doc.data().Package,
                status: doc.data().status,
                roomtype: doc.data().RoomType,
                mobile: doc.data().Phone,
                checkin: doc.data().ArriveDate,
                checkout: doc.data().DepartDate,
                payment: doc.data().paymentStatus,
            })))
        })
    }, []);
    console.log(dbData)

    const columns = [
        {
            field: 'id',
            headerName: 'BOOKING ID',
            width: 200,
            description: 'SELECT ONLY ONE ROW TO DELETE!',
            sortable: false,
        },

        {
            field: 'Customer',
            headerName: 'Customer Name',
            description: 'To Delete Rows, PLEASE SELECT ONLY 1 ROW.',
            sortable: false,
            width: 220,
        },

        { field: 'Package', headerName: 'Package', width: 110 },
        { field: 'status', headerName: 'Status', width: 80 },
        { field: 'roomtype', headerName: 'Room Type', width: 100 },
        { field: 'mobile', headerName: 'Mobile', width: 120 },
        { field: 'checkin', headerName: 'Check In', width: 150 },
        { field: 'checkout', headerName: 'Check Out', width: 150 },
        { field: 'payment', headerName: 'Payment', width: 80 },
    ];


    return (
        <Box sx={style.AllBookingsContainer}>
            <Box sx={style.AllBookingsHeaderContainer}>
                <Box sx={style.AllBookingsLeft}>
                    <Typography sx={style.BookListText}>Booking List</Typography>
                    <Typography sx={style.TotalBookText}>You have 424 Total Bookings</Typography>
                </Box>
                <Box sx={style.AllBookingsRight}>
                    <Box sx={style.AddBookButton}>
                        <AddIcon sx={style.AddBookIcon} onClick={handlePush} />
                    </Box>
                    <Box sx={style.ReportsButton}>
                        <ReportIcon />
                        <Typography sx={style.ReportsText}>Reports</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={style.BookListContainer}>
                <Box sx={style.ButtonContainer} >

                    <Box sx={style.leftContainer}>

                        <Box sx={style.ButtonRight}>
                            <Box>
                                <IconButton
                                    onClick={() => {
                                        const selectedIDs = selectionModel.toString();
                                        console.log(selectedIDs);
                                        if (window.confirm('Delete this Row?')) {
                                            db.collection('Bookings').doc(selectedIDs).delete().then(() => {
                                                console.log('Successfully Deleted!');
                                            })
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
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

                <Box sx={style.AllBookingsListContainer}>

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
