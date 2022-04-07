import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';

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
              <Dashboard />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
