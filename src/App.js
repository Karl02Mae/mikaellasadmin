import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from "./components/Header"
import AllBookings from './pages/AllBookings';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>

          <Route path="/login">
            <AdminLogin />
          </Route>

          <Route path="/dashboard" exact>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
