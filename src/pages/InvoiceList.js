import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddInvoiceModal from '../components/modals/AddInvoiceModal';
import { db, auth } from '../utils/firebase';
import InvoiceEditModal from '../components/modals/InvoiceEditModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InvoiceProofModal from '../components/modals/InvoiceProofModal';


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

export default function InvoiceList() {

    const [dbData, setDbData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const [edit, setEdit] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const selectedEdits = selectionModel.toString(); const [admin, setAdmin] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [adminName, setAdminName] = useState('');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

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
        db.collection('Invoices').orderBy('Date', 'asc').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                amount: doc.data().Amount,
                date: doc.data().Date,
                status: doc.data().Status,
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
        { field: 'id', headerName: 'Payment ID', width: 250 },
        { field: 'date', headerName: 'Date', width: 250 },
        { field: 'amount', headerName: 'Amount', width: 250 },
        { field: 'status', headerName: 'Status', width: 250 },
    ];

    return (
        <Box sx={style.InvoiceListContainer}>
            <Box sx={style.InvoiceListHeaderContainer}>
                <Box sx={style.InvoiceListLeft}>
                    <Typography sx={style.BookListText}>All Invoices</Typography>
                </Box>
                <Box sx={style.InvoiceListRight}>
                    <Box sx={style.AddBookButton}>
                        <AddIcon sx={style.AddBookIcon} onClick={() => setShow(true)} />
                    </Box>
                </Box>
            </Box>
            <Box>
                <AddInvoiceModal show={show} onClose={() => setShow(false)} />
            </Box>
            <Box>
                <InvoiceEditModal show={edit} onClose={() => setEdit(false)} ids={selectedEdits} />
            </Box>
            <Box>
                <InvoiceProofModal show={showImg} onClose={() => setShowImg(false)} ids={selectedEdits} />
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
                                            db.collection('Invoices').doc(selectedIDs).delete().then(() => {
                                                console.log('Successfully Deleted!');
                                            });

                                            db.collection('RecentActivities').add({
                                                Name: adminName,
                                                Action: 'Deleted an Invoice',
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
    )
}
