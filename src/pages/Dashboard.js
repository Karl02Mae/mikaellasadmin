import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { auth, db } from '../utils/firebase';
import { useHistory } from 'react-router-dom';

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
    fontSize: '30px',
    color: '#454545',
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
    cursor: 'pointer',
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

  // Start ng Styles ng Box na may comment sa baba
  TotalBookingContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '585px',
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
  //end ng Styles ng Box na may comment sa baba.. 

  TotalRnC: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '585px',
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
    width: '390px',
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

  // Start ng Styles ng TOP SELECTED PACKAGES

  TSP: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '390px',
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  TSPTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  tspnote: {
    fontSize: '9px',
    paddingLeft: 1.5,
  },
  ButtonContainer2: {
    display: 'flex',
    paddingTop: '15px',
    paddingRight: '5px',
    paddingLeft: '5px',
  },
  SortbyDateButton2: {
    display: 'flex',
    padding: '0.5px',
    alignItems: 'center',
    border: '1.5px solid black',
    borderRadius: '5px',
    height: 'fit-content',
  },
  Phases: {
    padding: 1,
  },
  Phasetext: {
    fontSize: 'small',
  },

  // Start ng Styles ng SALES REVENUE
  SalesRevenue: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '480px',
    marginLeft: 2,
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  SalesRevenueTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  SalesBot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  SalesMonth: {
    padding: 1,
  },
  SalesMonthText: {
    fontSize: 'small',
  },
  SalesWeek: {
    padding: 1,
  },
  SalesWeekText: {
    fontSize: 'small',
  },
  SalesDaily: {
    padding: 1,
  },
  SalesDailyText: {
    fontSize: 'small',
  },

  // Start ng Styles ng ROOM BOOKING CHART
  RBChart: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '300px',
    marginLeft: 2,
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  RBChartTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  // Start ng Styles ng Payment Methods
  PaymentMet: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '585px',
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  PaymentMetTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  StatusLabel: {
    display: 'flex',
    padding: '0.5px',
    alignItems: 'center',
    border: '1.5px solid black',
    borderRadius: '5px',
    height: 'fit-content',
    width: '583px',
    backgroundColor: '#591934',
  },
  StatusText: {
    paddingLeft: 1,
    paddingRight: 1,
    color: 'white',
    marginLeft: 65,
  },
  PaymentBot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  GCash: {
    padding: 1,
  },
  GCashText: {
    fontSize: 'small',
  },
  PayMaya: {
    padding: 1,
  },
  PayMayaText: {
    fontSize: 'small',
  },
  Paypal: {
    padding: 1,
  },
  PaypalText: {
    fontSize: 'small',
  },
  CreditCard: {
    padding: 1,
  },
  CreditText: {
    fontSize: 'small',
  },

  // Start ng Styles ng CUSTOMER LOG

  CusLog: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '320px',
    marginLeft: 2,
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  CusLogTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  ViewAllTop: {
    paddingLeft: 1,
    paddingRight: 1,
    marginLeft: 30,
  },



  // Start ng Styles ng RECENT ACTIVITIES

  RecentAct: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
    width: '585px',
    marginLeft: 2,
    backgroundColor: 'white',
    boxShadow: '0px 3px 5px gray',
  },
  RecentActTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },


}

export default function Dashboard() {

  const history = useHistory('');
  const [pmData, setPmData] = useState([]);
  const [bCount, setBCount] = useState();
  const [RnCCount, setRnCCount] = useState();
  const [EventCount, setEventCount] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        history.push('/');
      } else if (!authUser) {
        //user is logged out
        console.log('Log in!')
        history.push('/login')
      }
    })

    return () => {
      // perform clean up actions
      unsubscribe();
    }
  }, [history]);

  useEffect(() => {
    db.collection('SummaryBook').get().then((res) => {
      setBCount(res.size);
    })
  }, []);

  useEffect(() => {
    db.collection('RoomCottage').get().then((res) => {
      setRnCCount(res.size);
    })
  }, []);

  useEffect(() => {
    db.collection('EventsDetails').get().then((res) => {
      setEventCount(res.size);
    })
  }, []);

  useEffect(() => {
    db.collection('PaymentMethods').onSnapshot(snapshot => {
      setPmData(snapshot.docs.map(doc => ({
        data: doc.data(),
        id: doc.id
      })))
    })
  }, []);

  return (
    <HelmetProvider>
      <Box sx={style.DashboardContainer}>
        <Helmet>
          <title>Admin - Dashboard</title>
          <meta
            name="description"
            content="Welcome to Mikaella's Resort and Events Place ADMIN SITE!. This is strictly for administrator use only!"
            data-react-helmet="true"
          />
          <meta
            property="og:description"
            content="Welcome to Mikaella's Resort and Events Place ADMIN SITE!. This is strictly for administrator use only! "
            data-react-helmet="true"
          />
          <meta
            name="keywords"
            content="Mikaellas, Mikaellas Resort, Resort, Bulacan, Bustos,Bulacan"
            data-react-helmet="true"
          />
          <meta
            property="og:title"
            content="Mikaella's Resort and Events Place"
            data-react-helmet="true"
          />
        </Helmet>
        <Box sx={style.DashboardHeaderContainer}>
          <Box sx={style.DashboardHeaderContents}>

            <Typography sx={style.DashboardHeaderTitle}>Dashboard Overview</Typography>

            <Box sx={style.ButtonContainer}>
              <Box sx={style.ReportsButton} onClick={() => history.replace('/bookingreport')}>
                <ReportIcon />
                <Typography sx={style.ReportsText}>Reports</Typography>
              </Box>
            </Box>

          </Box>
        </Box>

        <Box sx={style.DashboardContents}>
          {/* Start ng kada isang BOX */}
          <Box sx={style.TotalBookingContainer}>

            <Box sx={style.TotalBookingTop}>
              <Typography sx={style.TotalBookingText}>Total Booking</Typography>
              <Tooltip title="Total Booking" placement='left-end' arrow>
                <HelpIcon sx={style.BookingHelpIcon} />
              </Tooltip>
            </Box>

            <Box sx={style.TotalBookingMid}>
              <Typography sx={style.TotalBookingNumbers}>{bCount}</Typography>
            </Box>

            {/* <Box sx={style.TotalBookingBot}>

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

          </Box> */}

          </Box>
          {/* End ng kada isang BOX.. eto yung gagayahin mo, 
        ibahin mo lang yung mga nakasulat at name sa Styles sa taas */}

          <Box sx={style.TotalRnC}>

            <Box sx={style.TotalRnCTop}>
              <Typography sx={style.TotalBookingText}>Total Rooms & Cottages</Typography>
              <Tooltip title="Total Rooms & Cottages" placement='left-end' arrow>
                <HelpIcon sx={style.BookingHelpIcon} />
              </Tooltip>
            </Box>

            <Box sx={style.TotalRnCMid}>
              <Typography sx={style.TotalBookingNumbers}>{RnCCount}</Typography>
            </Box>

            {/* <Box sx={style.TotalRnCBot}>

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

          </Box> */}

          </Box>

          <Box sx={style.FunctionHall}>

            <Box sx={style.FunctionHallTop}>
              <Typography sx={style.TotalBookingText}>Event Booking</Typography>
              <Tooltip title="Function Hall" placement='left-end' arrow>
                <HelpIcon sx={style.BookingHelpIcon} />
              </Tooltip>
            </Box>

            <Box sx={style.TotalRnCMid}>
              <Typography sx={style.TotalBookingNumbers}>{EventCount}</Typography>
            </Box>

            {/* <Box sx={style.FunctionHallBot}>

              <Box sx={style.UpEvents}>
                <Typography sx={style.UpcomingEvents}>Upcoming Events</Typography>
                <Typography sx={style.EventNumbers}>7</Typography>
              </Box>

              <Box sx={style.NextEvents}>
                <Typography sx={style.NextEventDate}>Next Event Date</Typography>
                <Typography sx={style.EventDate}>04-24-22</Typography>
              </Box>

            </Box> */}

          </Box>

        </Box>



        {/* <Box sx={style.DashboardContents}>

        <Box sx={style.TSP}>

          <Box sx={style.TSPTop}>
            <Typography sx={style.TotalBookingText}>Top Selected Packages</Typography>

            <Box sx={style.ButtonContainer2}>

              <Box sx={style.SortbyDateButton2}>
                <Typography sx={style.SortbyDateText}>Last 30 Days</Typography>
                <ArrowForwardIosIcon />
              </Box>

            </Box>

          </Box>

          <Box sx={style.TSPNote}>
            <Typography sx={style.tspnote}>In last 30 days top selected package</Typography>
          </Box>

          <Box sx={style.Phases}>
            <Typography sx={style.Phasetext}>Phase1 Package</Typography>
          </Box>

          <Box sx={style.Phases}>
            <Typography sx={style.Phasetext}>Phase2 Package</Typography>
          </Box>

          <Box sx={style.Phases}>
            <Typography sx={style.Phasetext}>Soft Opening Package</Typography>
          </Box>

          <Box sx={style.Phases}>
            <Typography sx={style.Phasetext}>Starter Package</Typography>
          </Box>

          <Box sx={style.Phases}>
            <Typography sx={style.Phasetext}>Starter Package</Typography>
          </Box>

          <Box sx={style.Phases}>
            <Typography sx={style.Phasetext}>Starter Package</Typography>
          </Box>

        </Box>

        <Box sx={style.SalesRevenue}>

          <Box sx={style.SalesRevenueTop}>
            <Typography sx={style.TotalBookingText}>Sales Revenue</Typography>
            <Tooltip title="Sales Revenue" placement='left-end' arrow>
              <HelpIcon sx={style.BookingHelpIcon} />
            </Tooltip>
          </Box>

          <Box sx={style.TSPNote}>
            <Typography sx={style.tspnote}>In last 30 days top selected package</Typography>
          </Box>

          <Box sx={style.SalesBot}>

            <Box sx={style.SalesMonth}>
              <Typography sx={style.SalesMonthText}>Monthly</Typography>
              <Typography sx={style.SalesMonthNumbers}>9.28k</Typography>
            </Box>

            <Box sx={style.SalesWeek}>
              <Typography sx={style.SalesWeekText}>Weekly</Typography>
              <Typography sx={style.SalesWeekNumbers}>2.69</Typography>
            </Box>

            <Box sx={style.SalesDaily}>
              <Typography sx={style.SalesDailyText}>Daily(Avg)</Typography>
              <Typography sx={style.SalesWDailyNumbers}>0.94</Typography>
            </Box>

          </Box>

        </Box>

        <Box sx={style.RBChart}>

          <Box sx={style.RBChartTop}>
            <Typography sx={style.TotalBookingText}>Room Booking Chart</Typography>
          </Box>

          <Box sx={style.ButtonContainer2}>

            <Box sx={style.SortbyDateButton2}>
              <Typography sx={style.SortbyDateText}>Last 30 Days</Typography>
              <ArrowForwardIosIcon />
            </Box>

          </Box>

        </Box>

      </Box> */}

        {/* Start ng Payment Methods*/}

        <Box sx={style.DashboardContents}>

          <Box sx={style.PaymentMet}>

            <Box sx={style.PaymentMetTop}>
              <Typography sx={style.TotalBookingText}>Payment Methods</Typography>
            </Box>

            <Box sx={style.StatusLabel}>
              <Typography sx={style.StatusText}>Status</Typography>
            </Box>


            {
              pmData.map(({ id, data }) => {
                return <Box key={id} sx={style.PaymentBot}>

                  <Box sx={style.GCash}>
                    <Typography sx={style.GCashText}>{data.MoPName}</Typography>
                  </Box>

                  <Box sx={style.GCash}>
                    <Typography sx={style.GCashText}>{data.Status}</Typography>
                  </Box>

                </Box>
              })
            }


          </Box>



          {/* Start ng CUSTOMER LOG*/}
          {/* <Box sx={style.CusLog}>

          <Box sx={style.CusLogTop}>
            <Typography sx={style.TotalBookingText}>Customer Log</Typography>
          </Box>

          <Box sx={style.ViewAllTop}>
            <a href=" # " className='btn'>View All</a>
          </Box>

        </Box> */}

          {/* Start ng Recent Activities*/}
          <Box sx={style.RecentAct}>

            <Box sx={style.RecentActTop}>
              <Typography sx={style.TotalBookingText}>Recent Activities</Typography>
              <Button onClick={() => history.push('/recent')}>Click here to View</Button>
            </Box>

          </Box>


        </Box>

      </Box>
    </HelmetProvider>
  )
}
