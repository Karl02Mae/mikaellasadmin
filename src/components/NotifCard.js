import React from 'react';
import { Box, Typography } from '@mui/material';
import { db } from '../utils/firebase';
import { useHistory } from 'react-router-dom';

const style = {
    NotifCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 1,
        borderRadius: '5px',
        marginBottom: 1,
        cursor: 'pointer',
    },
    NotifTitle: {
        fontWeight: 'bold',
    },
    NotifContents: {
        display: 'flex',
        flexDirection: 'column',
    },
    NotifDescStatus: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    NotifDesc: {
        fontWeight: '500',
        fontSize: 'small',
    },
    NotifStatus: {
        fontWeight: 'bold',
        fontSize: 'small',
        color: 'red',
    },
    NameDate: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    CusName: {
        fontWeight: '400',
        fontSize: 'small',
        color: 'gray',
    },
    NotifDate: {
        fontWeight: '400',
        fontSize: 'small',
        color: 'gray',
    }
}

export default function NotifCard(props) {

    const history = useHistory();

    const handleRead = () => {
        db.collection('Notifications').doc(props.id).update({
            Status: 'Read',
        }).catch((err) => {
            console.log(err);
        });

        if (props.title === 'New Booking!') {
            history.replace('/allbookings');
        } else if (props.title === 'New Support Message!') {
            history.replace('/support');
        }
    }

    return (
        <Box sx={style.NotifCardContainer} onClick={handleRead}>
            <Typography sx={style.NotifTitle}>{props.title}</Typography>
            <Box sx={style.NotifContents}>
                <Box sx={style.NotifDescStatus}>
                    <Box sx={style.NotifDesc}>{props.description}</Box>
                    <Typography sx={style.NotifStatus}>{props.status}</Typography>
                </Box>
                <Box sx={style.NameDate}>
                    <Typography sx={style.CusName}>Customer: {props.name}</Typography>
                    <Typography sx={style.NotifDate}>{props.date}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
