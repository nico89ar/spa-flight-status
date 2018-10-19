import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Header from './components/headerComponent/header';
import './Assets/css/default.min.css';
import FLightStatusEntryPage from "./components/pages/flight-status-entry-page";
import FLightStatusResultsPage from "./components/pages/flight-status-results-page";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Redirect exact from="/" to="/flight-status/entry/search-by-route" />
                        <Route path="/flight-status/entry" component={FLightStatusEntryPage} />
                        <Route path="/flight-status/results" component={FLightStatusResultsPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
