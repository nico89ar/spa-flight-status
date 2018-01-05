import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink, Redirect
} from 'react-router-dom';

//Components
import Header from './components/headerComponent/header';
import SearchByRoutePage from './components/pages/search-by-route-page';
import SearchByFlightPage from './components/pages/search-by-flight-page';

import './Assets/css/default.min.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <div className="container">
                        <h1 className="heading">Check Flight Status</h1>
                    </div>
                    <div className="container container-outer">
                        <div className="container container-centered">
                            <div className="row top-buffer">
                                <div className="col">
                                    <span>Get up-to-date information by completing the form below.</span>
                                    <br/>
                                    <br/>
                                    <ul className="tabs">
                                        <li>
                                            <NavLink exact to="/search-by-route" className="tab-item-default" activeClassName="tab-item-active" >Search by route</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to="/search-by-flight" className="tab-item-default" activeClassName="tab-item-active" >Search by flight #</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Redirect from="/" to="search-by-route" />
                        <Route exact path="/search-by-route" component={SearchByRoutePage} />
                        <Route exact path="/search-by-flight" component={SearchByFlightPage} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
