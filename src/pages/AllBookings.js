import React from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReportIcon from '@mui/icons-material/Report';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    
    {
      field: 'customer',
      headerName: 'Customer',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 240,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    { field: 'package', headerName: 'Package', width: 110 },
    { field: 'booking', headerName: 'Booking', width: 110 },
    { field: 'roomtype', headerName: 'Room Type', width: 110 },
    { field: 'mobile', headerName: 'Mobile', width: 120 },
    { field: 'checkin', headerName: 'Check In', width: 110 },
    { field: 'checkout', headerName: 'Check Out', width: 110 },
    { field: 'payment', headerName: 'Payment', width: 110 },
    { field: 'addicon', headerName: <AddIcon />, width: 50 },
  ];
  
  const rows = [
    { id: 1, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 1', booking: 'Active', roomtype: 'Family Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Paid'  },
    { id: 2, lastName: 'Walker', firstName: 'Sharon', package: 'Wedding', booking: 'Active', roomtype: 'Function Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Paid'  },
    { id: 3, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 2', booking: 'Pending', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Half'  },
    { id: 4, lastName: 'Walker', firstName: 'Sharon', package: 'Soft Opening', booking: 'Active', roomtype: 'Family Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Paid'  },
    { id: 5, lastName: 'Walker', firstName: 'Sharon', package: 'Pool Side', booking: 'Active', roomtype: 'Nipa Cottage', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Paid'  },
    { id: 6, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 2', booking: 'Pending', roomtype: 'Family Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Half'  },
    { id: 7, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 2', booking: 'Active', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Paid'  },
    { id: 8, lastName: 'Walker', firstName: 'Sharon', package: 'Corporate', booking: 'Pending', roomtype: 'Function Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Half'  },
    { id: 9, lastName: 'Walker', firstName: 'Sharon', package: 'Starter', booking: 'Canceled', roomtype: 'Family Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Canceled'  },
    { id: 10, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 1', booking: 'Canceled', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Canceled'  },
    { id: 11, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 1', booking: 'Canceled', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Canceled'  },
    { id: 12, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 2', booking: 'Canceled', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Canceled'  },
    { id: 13, lastName: 'Walker', firstName: 'Sharon', package: 'Phase 1', booking: 'Canceled', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Canceled'  },
    { id: 14, lastName: 'Walker', firstName: 'Sharon', package: 'Corporate', booking: 'Canceled', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Canceled'  },
    { id: 15, lastName: 'Walker', firstName: 'Sharon', package: 'Wedding', booking: 'Canceled', roomtype: 'Couple Room', mobile: '+124 394 1787', checkin: '10 Jan 2021', checkout: '15 Jan 2021', payment: 'Canceled'  },
  
  ];
  
const style = {
    AllBookingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    AllBookingsHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        alignItems: 'center',
    },
    AllBookingsLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    AllBookingsRight: {
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
        fontSize: 'large'
    },
    TotalBookText: {
        fontWeight: '500',
        fontSize: 'small',
    },
    ReportsButton: {
        display: 'flex',
        padding: '1px',
        alignItems: 'center',
        border: '1.5px solid black',
        borderRadius: '5px',
        height: 'fit-content',
        marginLeft: 1,
        backgroundColor: '#E7CE95',
    },
    ReportsText: {
        fontWeight: '500',
        fontSize: '12px',
    },
    AllBookingsListContainer: {
        backgroundColor: '#f7f7f7',
        height: '87%',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1px solid black',
        borderRadius: '10px',
    },
    ButtonContainer: {
        display: 'flex',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1px solid black',
        borderRadius: '10px',
      },
      leftContainer: {
        marginLeft: '-3px',
        flexDirection: 'column',
        border: '1px solid black',
        borderRadius: '5px',
        width: '1100px',
        backgroundColor: '#f7f7f7',
      },
      ButtonRight: {
        display: 'flex',
    },
    BulkActButton: {
        backgroundColor: 'lightgray',
        display: 'flex',
        padding: '0.5px',
        marginLeft: '10px',
        alignItems: 'center',
        border: '1.5px solid black',
        borderRadius: '5px',
        height: '30px',
    },
    BulkActText: {
        fontSize: 'medium',
        padding: 1,
    },
    ApplyButton: {
        display: 'flex',
        padding: '0.5px',
        marginLeft: '10px',
        alignItems: 'center',
        border: '1.5px solid black',
        borderRadius: '5px',
        height: '30px',
    },
    ApplyText: {
        fontSize: 'medium',
        padding: 1,
    },
      rightContainer: {
        flexDirection: 'column',
        border: '1px solid black',
        borderRadius: '5px',
        width: '90px',
        backgroundColor: '#f7f7f7',
      },
}

export default function AllBookings() {
    return (
        <Box sx={style.AllBookingsContainer}>
            <Box sx={style.AllBookingsHeaderContainer}>
                <Box sx={style.AllBookingsLeft}>
                    <Typography sx={style.BookListText}>Booking List</Typography>
                    <Typography sx={style.TotalBookText}>You have 424 Total Bookings</Typography>
                </Box>
                <Box sx={style.AllBookingsRight}>
                    <Box sx={style.AddBookButton}>
                        <AddIcon sx={style.AddBookIcon} />
                    </Box>
                    <Box sx={style.ReportsButton}>
                        <ReportIcon />
                        <Typography sx={style.ReportsText}>Reports</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={style.ButtonContainer} >

                <Box sx={style.leftContainer}>

                    <Box sx={style.ButtonRight}>
                        <Box sx={style.BulkActButton}>
                            <Typography sx={style.BulkActText}>Bulk Action</Typography>
                            <ArrowDropDownIcon/>
                        </Box>
                        
                        <Box sx={style.ApplyButton}>
                            <Typography sx={style.ApplyText}>Apply</Typography>
                        </Box>
                    </Box>
                
                </Box>

                <Box sx={style.rightContainer}>

                    <Box sx={style.FilSetButton} >

                        <Tooltip title="Filter list">
                            <IconButton>
                            <FilterListIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Settings">
                            <IconButton>
                            <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Box>

                
            </Box>
            
            <Box sx={style.AllBookingsListContainer}>
 
                    <DataGrid
                         rows={rows}
                         columns={columns}
                         pageSize={12}
                         rowsPerPageOptions={[12]}
                         checkboxSelection
                     />

            </Box>
        </Box>
    )
}
