import React from 'react';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


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
        height: '83%',
        width: '70%',
        border: '2px solid black',
        borderRadius: '10px',
    },
    SupportHeader: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
        marginLeft: 2,
    },
    name: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: 'black',
    },
    subtexts: {
        fontWeight: '500',
        fontSize: 'small',
        color: 'black',
    },
    SupportContent: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 4,
        marginLeft: 2,
        flexWrap: 'wrap',
    },
    Message: {
        marginTop: 2,
        marginLeft: 2,
    }
}

export default function ViewConcern(props) {
    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box>
                <Box sx={style.UploadContainer}>
                    <Box sx={style.UploadHeader}>
                        <Box></Box>
                        <Box sx={style.HeaderLeft}>
                            <Typography sx={style.HeaderText}>Support Concern</Typography>
                            <Typography sx={style.HeaderSubtext}>Customer Concern.</Typography>
                        </Box>
                        <Box sx={style.HeaderRight}>
                            <Tooltip title="Close">
                                <IconButton onClick={props.onClose} >
                                    <CloseIcon sx={style.closeIcon} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={style.UploadContent}>
                        <Box sx={style.SupportHeader}>
                            <Typography sx={style.name}>Customer Name: {props.name}</Typography>
                            <Typography sx={style.subtexts}>Date: {props.date}</Typography>
                            <Typography sx={style.subtexts}>Contact at: {props.email} or {props.phone}</Typography>
                        </Box>
                        <Box sx={style.SupportContent}>
                            <Typography sx={style.MessageHeader}>Message:</Typography>
                            <Typography sx={style.Message}>{props.comments}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}
