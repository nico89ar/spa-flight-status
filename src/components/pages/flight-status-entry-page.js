import React, { Component } from "react";
import SearchByRouteForm from "../formComponent/search-by-route-form";
import SearchByFlightNumberForm from "../formComponent/search-by-flight-number-form";
import {Route, NavLink} from 'react-router-dom';

class FLightStatusEntryPage extends Component {
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <h1 className="heading">Check Flight Status</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="container-outer">
                                <div className="container-inner">
                                    <div className="row top-buffer">
                                        <div className="col">
                                            <span>Get up-to-date information by completing the form below.</span>
                                            <br/>
                                            <br/>
                                            <ul className="tabs">
                                                <li>
                                                    <NavLink exact to="/flight-status/entry/search-by-route" className="tab-item-default" activeClassName="tab-item-active" >Search by route</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink exact to="/flight-status/entry/search-by-flight" className="tab-item-default" activeClassName="tab-item-active" >Search by flight #</NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <Route exact path="/flight-status/entry/search-by-route" component={SearchByRouteForm} />
                                    <Route exact path="/flight-status/entry/search-by-flight" component={SearchByFlightNumberForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FLightStatusEntryPage;