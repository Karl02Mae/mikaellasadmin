import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/LogoMK.png';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import CollectionsIcon from '@mui/icons-material/Collections';
import InventoryIcon from '@mui/icons-material/Inventory';


//Dropdowns
import BookingsDropDown from './dropdownmodals/BookingsDropDown';
import RnCDD from './dropdownmodals/RnCDD';
import ReportsDropDown from './dropdownmodals/ReportsDropDown';
import PaymentDD from './dropdownmodals/PaymentDD';


const style = {
    SidebarContainer: {
        display: 'flex',
        flex: 0.2,
        flexDirection: 'column',
    },
    SidebarHeader: {
        display: 'flex',
        backgroundColor: '#591934',
        borderBottom: '1px solid white',
        height: '70px',
        color: 'white',
        alignItems: 'center',
        textAlign: 'center',
        paddingLeft: 1,
    },
    SidebarContents: {
        backgroundColor: '#591934',
        height: '120.8vh',
    },
    spaceFiller: {
        backgroundColor: '#591934',
        flexGrow: '1',
    },
    DashboardLinks: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: 1,
        cursor: 'pointer',
        underline: 'none',
        textDecoration: 'none',
    },
}

export default function Sidebar() {

    const [BookDDI, setBookDDI] = useState(false);
    const [RnC, setRnC] = useState(false);
    const [Rep, setRep] = useState(false);
    const [Pay, setPay] = useState(false);

    const handleClickBookDDI = () => {
        if (BookDDI === false) {
            setBookDDI(true);
        } else if (BookDDI === true) {
            setBookDDI(false);
        }
    }

    const handleClickRnC = () => {
        if (RnC === false) {
            setRnC(true);
        } else if (RnC === true) {
            setRnC(false);
        }
    }

    const handleClickRep = () => {
        if (Rep === false) {
            setRep(true);
        } else if (Rep === true) {
            setRep(false);
        }
    }

    const handleClickPay = () => {
        if (Pay === false) {
            setPay(true);
        } else if (Pay === true) {
            setPay(false);
        }
    }

    return (
        <Box sx={style.SidebarContainer}>
            <Box sx={style.SidebarHeader}>
                <MenuIcon />
                <img src={Logo} alt="MKLogo" className='MKLogo' />
                <Typography >Mikaella's Resort & Events Place</Typography>
            </Box>
            <Box sx={style.SidebarContents}>

                <Link to='/' >
                    <Box sx={style.DashboardLinks} className='DashboardIcon'>
                        <DashboardIcon />
                        <Typography className='IconsText' >Dashboard</Typography>
                    </Box>
                </Link>


                <Box onClick={handleClickBookDDI} sx={style.DashboardLinks} className='BookingsIcon'>
                    <CalendarTodayIcon />
                    <Typography className='IconsText' >Bookings</Typography>
                    {BookDDI === false ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </Box>

                <Box sx={style.BookingsDD}>
                    <BookingsDropDown show={BookDDI} />
                </Box>

                <Box onClick={handleClickRnC} sx={style.DashboardLinks} className='RnCIcon'>
                    <RoomPreferencesIcon />
                    <Typography className='IconsText'>Rooms & Cottages</Typography>
                    {RnC === false ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </Box>

                <Box sx={style.RnCDropDown}>
                    <RnCDD show={RnC} />
                </Box>

                <Link to='/packages' >
                    <Box sx={style.DashboardLinks} className='PackageIcon'>
                        <InventoryIcon />
                        <Typography className='IconsText'>Packages</Typography>
                    </Box>
                </Link>

                <Box onClick={handleClickRep} sx={style.DashboardLinks} className='ReportsIcon'>
                    <ReportIcon />
                    <Typography className='IconsText'>Reports</Typography>
                    {Rep === false ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </Box>

                <Box sx={style.RepDropDown}>
                    <ReportsDropDown show={Rep} />
                </Box>

                <Link to='/customers' >
                    <Box sx={style.DashboardLinks} className='CustomersIcon'>
                        <PeopleIcon />
                        <Typography className='IconsText'>Customers</Typography>
                    </Box>
                </Link>

                <Box onClick={handleClickPay} sx={style.DashboardLinks} className='PaymentIcon'>
                    <PaidIcon />
                    <Typography className='IconsText'>Payment</Typography>
                    {Pay === false ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </Box>

                <Box sx={style.PayDropDown}>
                    <PaymentDD show={Pay} />
                </Box>

                <Box sx={style.DashboardLinks} className='SupportIcon'>
                    <SupportAgentIcon />
                    <Typography className='IconsText'>Support</Typography>
                </Box>

                <Link to='/sharedgallery'>
                    <Box sx={style.DashboardLinks} className='CollectionsIcon'>
                        <CollectionsIcon />
                        <Typography className='IconsText'>Shared Gallery</Typography>
                    </Box>
                </Link>

                <Link to='/settings'>
                    <Box sx={style.DashboardLinks} className='SettingsIcon'>
                        <SettingsIcon />
                        <Typography className='IconsText'>Settings</Typography>
                    </Box>
                </Link>

            </Box>
            <Box sx={style.spaceFiller}></Box>
        </Box>
    )
}
