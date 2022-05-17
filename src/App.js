import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from "./components/Header"
import AllBookings from './pages/AllBookings';
import AddBookings from './pages/AddBookings';
import EditBookings from './pages/EditBookings';
import AllRoomsandCottages from './pages/AllRoomsandCottages';
import RoomsCottagesType from './pages/RoomCottagesType';
import Expenses from './pages/Expenses';
import Booking from './pages/Booking';
import Customers from './pages/Customers';
import PaymentMethods from './pages/PaymentMethods';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetails from './pages/InvoiceDetails';
import SharedGallery from './pages/SharedGallery';
import Settings from './pages/Settings';
import Packages from './pages/Packages';

function App() {

  return (
    <div className="App">
      <Router>

        <Switch>

          <Route path="/login">
            <AdminLogin />
          </Route>

          <Route path="/" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <Dashboard />
              </div>
            </div>
          </Route>

          <Route path="/allbookings" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <AllBookings />
              </div>
            </div>
          </Route>

          <Route path="/addbookings" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <AddBookings />
              </div>
            </div>
          </Route>

          <Route path="/editbookings" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <EditBookings />
              </div>
            </div>
          </Route>

          <Route path="/allroomsandcottages" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <AllRoomsandCottages />
              </div>
            </div>
          </Route>

          <Route path="/roomsandcottagestype" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <RoomsCottagesType />
              </div>
            </div>
          </Route>

          <Route path="/expenses" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <Expenses />
              </div>
            </div>
          </Route>

          <Route path="/bookingreport" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <Booking />
              </div>
            </div>
          </Route>

          <Route path="/customers" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <Customers />
              </div>
            </div>
          </Route>

          <Route path="/paymentmethods" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <PaymentMethods />
              </div>
            </div>
          </Route>

          <Route path="/invoicelist" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <InvoiceList />
              </div>
            </div>
          </Route>

          <Route path="/invoicedetails" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <InvoiceDetails />
              </div>
            </div>
          </Route>

          <Route path="/sharedgallery" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <SharedGallery />
              </div>
            </div>
          </Route>

          <Route path="/settings" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <Settings />
              </div>
            </div>
          </Route>

          <Route path="/packages" exact>
            <div className='app_page'>
              <Sidebar />
              <div className='HeaderToBody'>
                <Header />
                <Packages />
              </div>
            </div>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
