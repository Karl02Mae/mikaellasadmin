import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { db, auth } from '../utils/firebase';
// import AddCustomers from '../components/modals/AddCustomers';


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
    // const [show, setShow] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]); const [admin, setAdmin] = useState([]);
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
        db.collection('ClientsProfile').orderBy('displayName', 'asc').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                user: doc.data().displayName,
                gender: doc.data().gender,
                address: doc.data().address,
                num: doc.data().phoneNumber,
                email: doc.data().email,
            })))
        })
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },

        {
            field: 'user',
            headerName: 'User',
            sortable: false,
            width: 180,
        },
        { field: 'gender', headerName: 'Gender', width: 120 },
        { field: 'address', headerName: 'Address', width: 120 },
        { field: 'num', headerName: 'Number', width: 120 },
        { field: 'email', headerName: 'Email', width: 250 },
    ];

    return (
        <HelmetProvider>
            <Box sx={style.ExpensesContainer}>
                <Helmet>
                    <title>Admin - Customers</title>
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
                <Box sx={style.ExpensesHeaderContainer}>
                    <Box sx={style.ExpensesLeft}>
                        <Typography sx={style.BookListText}>Customer's List</Typography>
                    </Box>
                    <Box sx={style.ExpensesRight}>
                        {/* <Box sx={style.AddBookButton}>
                            <AddIcon sx={style.AddBookIcon} onClick={() => setShow(true)} />
                        </Box> */}
                    </Box>
                </Box>

                {/* <Box>
                    <AddCustomers show={show} onClose={() => setShow(false)} />
                </Box> */}

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
                                                db.collection('ClientsProfile').doc(selectedIDs).delete().then(() => {
                                                    console.log('Successfully Deleted!');
                                                });

                                                db.collection('RecentActivities').add({
                                                    Name: adminName,
                                                    Action: 'Deleted a Customer',
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

                        </Box>

                        <Box sx={style.rightContainer}>



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
        </HelmetProvider>
    )
}
