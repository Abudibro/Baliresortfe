import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Resorts from './Pages/Resorts/Resorts';
import ResortPage from './Pages/ResortPage/ResortPage';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound';
import { AdminSignIn } from './Pages/AdminSignIn/AdminSignIn';
import Dashboard from './Pages/Dashboard/Dashboard'
import Edit from './Pages/Edit/Edit';
import Add from './Pages/Add/Add';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/resorts' component={Resorts} exact/>
            <Route path='/resorts/:id' component={ResortPage}/>
            <Route path='/dashboard' component={Dashboard} exact/>
            <Route path='/admin' component={AdminSignIn} exact/>
            <Route path='/dashboard/edit/:id' component={Edit} exact/>
            <Route path='/dashboard/add' component={Add}/>
            <Route path='/' component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;