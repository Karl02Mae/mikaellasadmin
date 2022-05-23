import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { db } from '../utils/firebase';

const style = {
    UploadContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100%',
        width: '98%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '99',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 2,
    },
    UploadHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '5%',
    },
    HeaderLeft: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: '30px',
        color: 'white',
    },
    HeaderSubtext: {
        fontWeight: '500',
        fontSize: 'small',
        color: 'white',
    },
    HeaderRight: {
        display: 'flex',
        color: 'white',
    },
    closeIcon: {
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '15px',
    },
    UploadContent: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        height: '80%',
        width: '80%',
        border: '2px solid black',
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UploadButton: {
        width: '30%',
        margin: 5,
        alignSelf: 'center',
    },
    ImageContainer: {
        display: 'flex',
        height: 'fit-content',
        width: 'fit-content',
    },
}

export default function EventInvoiceProofModal(props) {

    const [data, setData] = useState([]);
    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
        db.collection('Events').orderBy('CheckIn').onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, []);

    const handleDisplay = () => {
        data.map(({ id, data }) => {
            if (id === props.ids) {
                setImgUrl(data.imageUrl);
            }
            return <Box key={id}></Box>
        })
    }

    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box>
                <Box sx={style.UploadContainer}>
                    <Box sx={style.UploadHeader}>
                        <Box></Box>
                        <Box sx={style.HeaderLeft}>
                            <Typography sx={style.HeaderText}>Proof of Payment</Typography>
                        </Box>
                        <Box sx={style.HeaderRight}>
                            <Tooltip title="Close">
                                <IconButton onClick={() => { setImgUrl(''); props.onClose(); }} >
                                    <CloseIcon sx={style.closeIcon} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={style.UploadContent}>
                        <Box sx={style.ImageContainer}>
                            <img className="ProofOfPayment__thumbnail" src={imgUrl} alt="Click View to Display" height="450px" />
                        </Box>
                    </Box>
                    <Button
                        sx={style.UploadButton}
                        variant='contained'
                        color='secondary'
                        onClick={handleDisplay}
                    >
                        View Proof
                    </Button>
                </Box>
            </Box>
        )
    }
}
