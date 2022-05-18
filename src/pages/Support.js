import React, { useState, useEffect } from 'react';
import { Typography, Box, IconButton, Tooltip, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { db, auth } from '../utils/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewConcern from '../components/modals/ViewConcern';

const style = {
    SupportContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    SGHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    SGLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    SGHeaderText: {
        fontWeight: 'bold',
        fontSize: '30px',
        color: '#454545',
    },
    SGHeaderSubtext: {
        fontWeight: '500',
        fontSize: 'small',
        color: 'gray',
    },
    AllBookingsListContainer: {
        backgroundColor: 'white',
        height: '87%',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    Buttons: {
        marginLeft: 1,
    },
    Spacer: {
        height: '50px',
    }
}

export default function Support() {

    const [dbData, setDbData] = useState([]);
    const [data, setData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [show, setShow] = useState(false);

    const [admin, setAdmin] = useState([]);
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


    const selectedIDs = selectionModel.toString();

    const columns = [
        {
            field: 'id',
            headerName: 'CUSTOMER ID',
            width: 200,
            description: 'SELECT ONLY ONE ROW TO DELETE!',
        },

        {
            field: 'name',
            headerName: 'Customer Name',
            description: 'To Delete Rows, PLEASE SELECT ONLY 1 ROW.',
            width: 220,
        },

        { field: 'date', headerName: 'Date', width: 150 },
    ];

    useEffect(() => {
        db.collection('SupportConcern').orderBy('date', 'desc').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                date: doc.data().date,
                name: doc.data().name,
            })))
        })
    }, []);

    useEffect(() => {
        db.collection('SupportConcern').orderBy('date', 'desc').onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, []);

    return (
        <Box sx={style.SupportContainer}>
            <Box sx={style.SGHeaderContainer}>
                <Box sx={style.SGLeft}>
                    <Typography sx={style.SGHeaderText}>Support Concerns</Typography>
                    <Typography sx={style.SGHeaderSubtext}>Read Customer concerns here.</Typography>
                </Box>
                <Box sx={style.SGRight}>
                </Box>
            </Box>
            <Box sx={style.Buttons}>
                <Tooltip title='Delete selected'>
                    <IconButton
                        onClick={() => {
                            console.log(selectedIDs);
                            if (selectedIDs !== '') {
                                if (window.confirm('Delete this Row?')) {
                                    db.collection('SupportConcern').doc(selectedIDs).delete().then(() => {
                                        console.log('Successfully Deleted!');
                                    });

                                    db.collection('RecentActivities').add({
                                        Name: adminName,
                                        Action: 'Deleted a Support Message',
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

                <Tooltip title='View Concern'>
                    <IconButton
                        onClick={() => {
                            console.log(selectedIDs);
                            if (selectedIDs !== '') {
                                if (window.confirm('View this Row?')) {
                                    setShow(true);
                                }
                            } else if (selectedIDs === '') {
                                alert('Please select one row to view!');
                            }
                        }}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box>
                {
                    data.map(({ id, data }) => {
                        if (selectedIDs === id) {
                            return <ViewConcern
                                key={id}
                                show={show}
                                onClose={() => setShow(false)}
                                ids={selectedIDs}
                                name={data.name}
                                date={data.date}
                                comments={data.comments}
                                email={data.email}
                                phone={data.phone}
                            />
                        } else { return <Box key={id}></Box> }
                    })
                }

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
            <Box sx={style.Spacer}></Box>
        </Box>
    )
}
