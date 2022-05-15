import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { db } from '../utils/firebase';
import PaymentMethodModal from '../components/modals/PaymentMethodModal';




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
        fontSize: '30px',
        color: '#454545',
    },
    TotalBookText: {
        fontWeight: '500',
        fontSize: 'small',
        color: 'gray',
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

    const [dbData, setDbData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const selectedModel = selectionModel.toString();

    const handleActivate = () => {
        if (show === false && selectedModel !== '') {
            setShow(true);
        } else if (selectedModel === '') {
            alert('Please select a row!');
        }
    }

    useEffect(() => {
        db.collection('PaymentMethods').orderBy('No', 'asc').onSnapshot(snapshot => {
            setDbData(snapshot.docs.map(doc => ({
                id: doc.id,
                no: doc.data().No,
                name: doc.data().Name,
                payname: doc.data().MoPName,
                email: doc.data().Email,
                num: doc.data().AcctNo,
                status: doc.data().Status,
            })))
        })
    }, []);




    const columns = [
        { field: 'no', headerName: 'NO.', width: 80 },
        { field: 'name', headerName: 'Name', width: 230, },
        { field: 'payname', headerName: 'Payment Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 310 },
        { field: 'num', headerName: 'Acct Number', width: 150 },
        { field: 'status', headerName: 'Status', width: 80 },
    ];

    return (
        <Box sx={style.PaymentMethodsContainer}>
            <Box sx={style.PaymentMethodsHeaderContainer}>
                <Box sx={style.PaymentMethodsLeft}>
                    <Typography sx={style.BookListText}>Payment Methods</Typography>
                    <Typography sx={style.TotalBookText}>Here is the procedure of payment.</Typography>
                </Box>
                <Box sx={style.PaymentMethodsRight}>

                </Box>
            </Box>

            <Box sx={style.BookListContainer}>
                <Box sx={style.ButtonContainer} >

                    <Box sx={style.leftContainer}>

                        <Box sx={style.ButtonRight}>
                            <Tooltip title='Activate/Deactivate'>
                                <IconButton onClick={handleActivate}>
                                    <ToggleOnIcon />
                                    <Typography>Activate/Deactivate</Typography>
                                </IconButton>
                            </Tooltip>
                        </Box>

                    </Box>

                    <Box sx={style.rightContainer}>

                    </Box>


                </Box>

                <Box>
                    <PaymentMethodModal show={show} onClose={() => setShow(false)} ids={selectionModel.toString()} />
                </Box>

                <Box sx={style.PaymentMethodsListContainer}>

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
