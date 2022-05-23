import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { db, auth } from '../utils/firebase';
import EventInvoiceEditModal from '../components/modals/EventInvoiceEditModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventInvoiceProofModal from '../components/modals/EventInvoiceProofModal';
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

export default function EventInvoice() {

    const [dbData, setDbData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [edit, setEdit] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const selectedEdits = selectionModel.toString(); const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');

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

    useEffect(() => {
        db.collection('EventsDetails').orderBy('ArriveDate').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                Price: doc.data().Price,
                CheckIn: doc.data().ArriveDate,
                PaymentStatus: doc.data().paymentStatus,
                imageUrl: doc.data().imageUrl,
            })))
        })
    }, []);

    const handleShowEdit = () => {
        if (edit === false && selectedEdits !== '') {
            setEdit(true);
        } else if (selectedEdits === '') {
            alert('Please select a row!');
        }
    }

    const handleShowImg = () => {
        console.log(selectedEdits);
        if (showImg === false && selectedEdits !== '') {
            setShowImg(true);
        } else if (selectedEdits === '') {
            alert('Please select a row!');
        }
    }



    const columns = [
        { field: 'id', headerName: 'Payment ID', width: 300 },
        { field: 'CheckIn', headerName: 'Arrive Date', width: 250 },
        { field: 'Price', headerName: 'Amount', width: 250 },
        { field: 'PaymentStatus', headerName: 'Payment Status', width: 250 },
    ];

    return (
        <HelmetProvider>
            <Box sx={style.InvoiceListContainer}>
                <Helmet>
                    <title>Admin - Events Invoice List</title>
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
                        <Typography sx={style.BookListText}>Events Invoices</Typography>
                    </Box>
                    <Box sx={style.InvoiceListRight}>
                    </Box>
                </Box>
                <Box>
                    <EventInvoiceEditModal show={edit} onClose={() => setEdit(false)} ids={selectedEdits} />
                </Box>
                <Box>
                    <EventInvoiceProofModal show={showImg} onClose={() => setShowImg(false)} ids={selectedEdits} />
                </Box>

                <Box sx={style.BookListContainer}>
                    <Box sx={style.ButtonContainer} >

                        <Box sx={style.leftContainer}>

                            <Tooltip title='Edit Selected'>
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
                            </Tooltip>

                            <Tooltip title="View Proof of Payment of selected row">
                                <IconButton
                                    onClick={() => {
                                        if (window.confirm('View Proof for this Row?')) {
                                            handleShowImg();
                                            console.log(selectedEdits);
                                        }
                                    }}
                                >
                                    <VisibilityIcon />
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
