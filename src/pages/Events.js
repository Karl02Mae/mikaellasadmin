import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import { db, auth } from '../utils/firebase';
import { HelmetProvider, Helmet } from 'react-helmet-async';

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

export default function Events() {

    const [eventData, setEventData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    // const history = useHistory();
    // const [show, setShow] = useState(false);
    // const [edit, setEdit] = useState(false);
    const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    // const selectedEdits = selectionModel.toString();

    useEffect(() => {
        db.collection('admin').onSnapshot(snapshot => {
            setAdmin(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    useEffect(() => {
        admin.map(({ id, data }) => {
            if (currentUser === data.adminID) {
                setAdminName(data.adminName);
            }
            return <div key={id}></div>
        })
    }, [admin, adminName, currentUser])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setCurrentUser(authUser.uid)
            } else if (!authUser) {
                //user is logged out
                console.log('Log in!')
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, []);

    // const handleShowEdit = () => {
    //     if (edit === false && selectedEdits !== '') {
    //         setEdit(true);
    //     } else if (selectedEdits === '') {
    //         alert('Please select a row!');
    //     }
    // }

    useEffect(() => {
        db.collection('Events').orderBy('CheckIn').onSnapshot(snapshot => {
            setEventData(snapshot.docs.map(doc => ({
                id: doc.id,
                FullName: doc.data().FullName,
                EventsName: doc.data().EventsName,
                CheckIn: doc.data().CheckIn,
                CheckOut: doc.data().CheckOut,
                Guest: doc.data().Guest,
                EventStatus: doc.data().EventStatus,
                PaymentType: doc.data().PaymentType,
                PaymentStatus: doc.data().PaymentStatus,
            })))
        })
    }, []);

    const columns = [
        { field: 'FullName', headerName: 'Full Name', width: 200 },
        { field: 'EventsName', headerName: 'Event Name', width: 150 },
        { field: 'CheckIn', headerName: 'Check In', width: 180 },
        { field: 'CheckOut', headerName: 'CheckOut', width: 180 },
        { field: 'Guest', headerName: 'Guest No.', width: 100 },
        { field: 'EventStatus', headerName: 'Status', width: 100 },
        { field: 'PaymentType', headerName: 'Payment Type', width: 120 },
        { field: 'PaymentStatus', headerName: 'Payment Status', width: 130 },
    ];

    return (
        <HelmetProvider>
            <Box sx={style.AllRoomsandCottagesContainer}>
                <Helmet>
                    <title>Admin - Events Booking</title>
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
                <Box sx={style.AllRoomsandCottagesHeaderContainer}>
                    <Box sx={style.AllRoomsandCottagesLeft}>
                        <Typography sx={style.BookListText}>Events Booking</Typography>
                        <Typography sx={style.TotalBookText}>Here is the list of Events Booked.</Typography>
                    </Box>
                    {/* <Box sx={style.AllRoomsandCottagesRight}>
                        <Tooltip title="Add an Event">
                            <IconButton onClick={() => setShow(true)}>
                                <Box sx={style.AddBookButton}>
                                    <AddIcon sx={style.AddBookIcon} />
                                </Box>
                            </IconButton>
                        </Tooltip>
                    </Box> */}
                </Box>
                {/* <Box sx={style.AddRnCModal}>
                    <AddRnCModal show={show} onClose={() => setShow(false)} />
                </Box> */}
                <Box sx={style.BookListContainer}>
                    <Box sx={style.ButtonContainer} >

                        <Box sx={style.leftContainer}>

                            <Box sx={style.ButtonRight}>
                                <Box>
                                    <Tooltip title='Delete selected'>
                                        <IconButton
                                            onClick={() => {
                                                const selectedIDs = selectionModel.toString();
                                                console.log(selectedIDs);
                                                if (selectedIDs !== '') {
                                                    if (window.confirm('Delete this Row?')) {
                                                        db.collection('Events').doc(selectedIDs).delete().then(() => {
                                                            console.log('Successfully Deleted!');
                                                        })

                                                        db.collection('RecentActivities').add({
                                                            Name: adminName,
                                                            Action: 'Deleted an Event',
                                                            Date: date,
                                                        }).catch((error) => {
                                                            console.log(error);
                                                        });
                                                    }
                                                } else if (selectedIDs === '') {
                                                    alert('Please select a row to delete!');
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>

                                    {/* <Tooltip title='Edit Selected'>
                                        <IconButton
                                            onClick={() => {
                                                if (window.confirm('Edit this Row?')) {
                                                    handleShowEdit();
                                                    console.log(selectedEdits);
                                                }
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip> */}
                                </Box>
                            </Box>

                        </Box>

                        {/* <Box sx={style.rightContainer}>
                            <RnCEdit show={edit} onClose={() => setEdit(false)} ids={selectedEdits} />
                        </Box> */}


                    </Box>

                    <Box sx={style.AllRoomsandCottagesListContainer}>

                        <DataGrid
                            rows={eventData}
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
            </Box >
        </HelmetProvider>
    )
}
