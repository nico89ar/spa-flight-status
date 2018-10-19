import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import queryString from "query-string";
import moment from "moment/moment";

class ResultsGridHeader extends Component {

    getURL(daysOffset) {
        const tomorrow = moment().add(daysOffset, 'days').format('Y-MM-DD');
        let query = queryString.parse(this.props.location.search);
        query.departureDate = tomorrow;

        return('/flight-status/results?' +  queryString.stringify(query));
    }

    handleClick(ev) {
        this.props.location.state = undefined;
    }

    render(){
        return (
            <div className="row grid-header">
                <div className="col grid-header--date">
                    {this.props.departureDate}
                </div>
                <div className="col">
                    <NavLink exact className="day-tab" activeClassName="day-tab-active" onClick={this.handleClick.bind(this)} to={this.getURL(-1)}>Yesterday</NavLink>
                </div>
                <div className="col">
                    <NavLink exact className="day-tab" activeClassName="day-tab-active" onClick={this.handleClick.bind(this)} to={this.getURL(0)}>Today</NavLink>
                </div>
                <div className="col">
                    <NavLink exact className="day-tab" activeClassName="day-tab-active" onClick={this.handleClick.bind(this)} to={this.getURL(1)}>Tomorrow</NavLink>
                </div>
            </div>
        );
    }
}

export default withRouter(ResultsGridHeader);