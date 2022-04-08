import React from 'react';
import { Box, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReportIcon from '@mui/icons-material/Report';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
// import { Chart, BarSeries } from '@devexpress/dx-react-chart-material-ui';

const style = {
  DashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  DashboardHeaderContainer: {
    display: 'flex',
  },
  DashboardHeaderContents: {
    display: 'flex',
    width: '100%',
    height: '5vh',
    justifyContent: 'space-between',
    padding: '20px',
    paddingLeft: '10px',
    alignItems: 'center',
  },
  DashboardHeaderTitle: {
    fontWeight: '500',
    fontSize: 'larger',
  },
  ButtonContainer: {
    display: 'flex',
  },
  SortbyDateButton: {
    display: 'flex',
    padding: '0.5px',
    alignItems: 'center',
    border: '1.5px solid black',
    borderRadius: '5px',
    height: 'fit-content',
  },
  SortbyDateText: {
    paddingLeft: 1,
    paddingRight: 2,
  },
  ReportsButton: {
    display: 'flex',
    padding: '0.5px',
    alignItems: 'center',
    border: '1.5px solid black',
    borderRadius: '5px',
    height: 'fit-content',
    marginLeft: 1,
    backgroundColor: '#E7CE95',
  },
  ReportsText: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  DashboardContents: {
    display: 'flex',
    height: 'fit-content',
    padding: '20px',
    paddingLeft: '10px',
    paddingTop: '10px',
  },
  TotalBookingContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '300px',
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  TotalBookingTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  TotalBookingText: {
    fontSize: 'medium',
    padding: 1,
  },
  BookingHelpIcon: {
    fontSize: 'small !important',
    color: 'gray',
    padding: 0.5,
  },
  TotalBookingNumbers: {
    fontSize: 'larger',
    fontWeight: 'bold',
    paddingLeft: 1.5,
  },
  TotalBookingBot: {
    display: 'flex',
  },
  BookMonth: {
    padding: 1,
  },
  MonthText: {
    fontSize: 'small',
  },
  BookWeek: {
    padding: 1,
  },
  WeekText: {
    fontSize: 'small',
  },
  TotalRnC: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '300px',
    marginLeft: 2,
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  TotalRnCTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  TotalRnCBot: {
    display: 'flex',
  },
  FunctionHall: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '300px',
    marginLeft: 2,
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  FunctionHallAvailability: {
    fontSize: 'larger',
    fontWeight: 'bold',
    paddingLeft: 1.5,
    color: '#3872E3',
  },
  FunctionHallTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  FunctionHallBot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  UpEvents: {
    padding: 1,
  },
  UpcomingEvents: {
    fontSize: 'small',
  },
  NextEvents: {
    padding: 1,
  },
  NextEventDate: {
    fontSize: 'small',
  },
}

export default function Dashboard() {

  return (
    <Box sx={style.DashboardContainer}>

      <Box sx={style.DashboardHeaderContainer}>
        <Box sx={style.DashboardHeaderContents}>

          <Typography sx={style.DashboardHeaderTitle}>Dashboard Overview</Typography>

          <Box sx={style.ButtonContainer}>

            <Box sx={style.SortbyDateButton}>
              <CalendarMonthIcon />
              <Typography sx={style.SortbyDateText}>Last 30 Days</Typography>
              <ArrowForwardIosIcon />
            </Box>

            <Box sx={style.ReportsButton}>
              <ReportIcon />
              <Typography sx={style.ReportsText}>Reports</Typography>
            </Box>

          </Box>

        </Box>
      </Box>

      <Box sx={style.DashboardContents}>

        <Box sx={style.TotalBookingContainer}>

          <Box sx={style.TotalBookingTop}>
            <Typography sx={style.TotalBookingText}>Total Booking</Typography>
            <Tooltip title="Total Booking" placement='left-end' arrow>
              <HelpIcon sx={style.BookingHelpIcon} />
            </Tooltip>
          </Box>

          <Box sx={style.TotalBookingMid}>
            <Typography sx={style.TotalBookingNumbers}>424</Typography>
          </Box>

          <Box sx={style.TotalBookingBot}>

            <Box sx={style.BookMonth}>
              <Typography sx={style.MonthText}>This Month</Typography>
              <Typography sx={style.MonthNumbers}>83</Typography>
            </Box>

            <Box sx={style.BookWeek}>
              <Typography sx={style.WeekText}>This Week</Typography>
              <Typography sx={style.WeekNumbers}>18</Typography>
            </Box>

            <Box sx={style.BookChart}>

            </Box>

          </Box>

        </Box>

        <Box sx={style.TotalRnC}>

          <Box sx={style.TotalRnCTop}>
            <Typography sx={style.TotalBookingText}>Total Rooms & Cottages</Typography>
            <Tooltip title="Total Rooms & Cottages" placement='left-end' arrow>
              <HelpIcon sx={style.BookingHelpIcon} />
            </Tooltip>
          </Box>

          <Box sx={style.TotalRnCMid}>
            <Typography sx={style.TotalBookingNumbers}>24</Typography>
          </Box>

          <Box sx={style.TotalRnCBot}>

            <Box sx={style.BookMonth}>
              <Typography sx={style.MonthText}>Available</Typography>
              <Typography sx={style.MonthNumbers}>18</Typography>
            </Box>

            <Box sx={style.BookWeek}>
              <Typography sx={style.WeekText}>Booked</Typography>
              <Typography sx={style.WeekNumbers}>6</Typography>
            </Box>

            <Box sx={style.BookChart}>

            </Box>

          </Box>

        </Box>

        <Box sx={style.FunctionHall}>

          <Box sx={style.FunctionHallTop}>
            <Typography sx={style.TotalBookingText}>Function Hall</Typography>
            <Tooltip title="Function Hall" placement='left-end' arrow>
              <HelpIcon sx={style.BookingHelpIcon} />
            </Tooltip>
          </Box>

          <Box sx={style.TotalRnCMid}>
            <Typography sx={style.FunctionHallAvailability}>Available</Typography>
          </Box>

          <Box sx={style.FunctionHallBot}>

            <Box sx={style.UpEvents}>
              <Typography sx={style.UpcomingEvents}>Upcoming Events</Typography>
              <Typography sx={style.EventNumbers}>7</Typography>
            </Box>

            <Box sx={style.NextEvents}>
              <Typography sx={style.NextEventDate}>Next Event Date</Typography>
              <Typography sx={style.EventDate}>04-24-22</Typography>
            </Box>

          </Box>

        </Box>

      </Box>

    </Box>
  )
}
