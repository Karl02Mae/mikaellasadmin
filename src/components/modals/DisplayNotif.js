import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { db } from '../utils/firebase';

import NotifCard from '../NotifCard';

const style = {
    NotifContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '80%',
        width: '30%',
        top: '70px',
        right: '0',
        bottom: '0',
        zIndex: '99',
        backgroundColor: '#591934',
        padding: 2,
        borderRadius: '10px',
        boxShadow: '-5px 5px 5px rgba(0,0,0,0.4)',
    },
    HeaderContainer: {
        borderBottom: '1px solid white',
        paddingBottom: 1,
        marginBottom: 2,
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 'large',
        color: 'white',
    },
}

export default function DisplayNotif(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        db.collection('Notifications').orderBy('Date', 'desc').onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })));
        });
    }, []);


    if (props.show === false) {
        return null;
    } else if (props.show === true) {
        return (
            <Box sx={style.NotifContainer}>
                <Box sx={style.HeaderContainer}>
                    <Box sx={style.HeaderTitle}>
                        <Typography sx={style.HeaderText}>Notifications</Typography>
                    </Box>
                </Box>
                <Box sx={style.NotifContents}>
                    {
                        data.slice(0, 5).map(({ id, data }) => {
                            if (data.Status === 'Unread') {
                                return <NotifCard
                                    key={id}
                                    name={data.CustomerName}
                                    date={data.Date}
                                    description={data.Desc}
                                    status={data.Status}
                                    title={data.Title}
                                    id={id}
                                />
                            } else {
                                return <Box key={id}></Box>
                            }
                        })
                    }
                </Box>
            </Box>
        )
    }
}
