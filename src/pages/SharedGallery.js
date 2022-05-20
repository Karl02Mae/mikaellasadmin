import React, { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import GalleryCard from '../components/GalleryCard';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import UploadIcon from '@mui/icons-material/Upload';
import UploadModal from '../components/modals/UploadModal';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const style = {
    SGContainer: {
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
    SGRight: {
        display: 'flex',
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
    SGGallery: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}

export default function SharedGallery() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                setUser(authUser);
            } else {
                //user is logged out
                setUser(null);
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        db.collection('sharedGallery').orderBy('date', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);

    return (
        <HelmetProvider>
            <Box sx={style.SGContainer}>
                <Helmet>
                    <title>Admin - Shared Gallery</title>
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
                <Box sx={style.SGHeaderContainer}>
                    <Box sx={style.SGLeft}>
                        <Typography sx={style.SGHeaderText}>Shared Gallery</Typography>
                        <Typography sx={style.SGHeaderSubtext}>Upload and Delete Photos here</Typography>
                    </Box>
                    <Box sx={style.SGRight}>
                        <Tooltip title="Upload Image">
                            <IconButton onClick={() => setShow(true)}>
                                <UploadIcon />
                                <Typography>Upload</Typography>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box>
                    <UploadModal show={show} onClose={() => setShow(false)} />
                </Box>
                <Box sx={style.SGGallery}>
                    {
                        posts.map(({ id, data }) => (
                            < GalleryCard
                                key={id}
                                id={id}
                                imageUrl={data.imageUrl}
                            />
                        ))

                    }
                </Box>
            </Box>
        </HelmetProvider>
    )
}
