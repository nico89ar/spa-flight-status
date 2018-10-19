import React, { Component } from "react";
import {  withRouter } from 'react-router-dom';
import ResultsGrid from "../flightStatus/results-grid";
import queryString from "query-string";
import flightStatusClient from "../../classes/apiClients/flightStatusClient";

class FLightStatusResultsPage extends Component {

    constructor(props) {
        super(props);
        const query = queryString.parse(this.props.location.search);
        this.state = {
                departureAirport: query.departureAirport,
                arrivalAirport: query.arrivalAirport,
                departureDate: query.departureDate,
                flightNumber: query.flightNumber,
            };
    }

    componentWillMount() {
        if(this.props.location.state) {
            this.setState({response: this.props.location.state.response});
        } else {
            flightStatusClient.getFlightStatus({
                departureDate: this.state.departureDate,
                departureAirport: this.state.departureAirport.substr(-3),
                arrivalAirport: this.state.arrivalAirport.substr(-3),
                flightNumber: this.state.flightNumber || ''
            }).then(response => {
                this.setState({response: response});
            });
        }
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.location.state) {
            this.setState({response: nextProps.location.state.response});
        } else {
            this.setState({response: undefined});
            flightStatusClient.getFlightStatus({
                departureDate: this.state.departureDate,
                departureAirport: this.state.departureAirport.substr(-3),
                arrivalAirport: this.state.arrivalAirport.substr(-3),
                flightNumber: this.state.flightNumber || ''
            }).then(response => {
                this.setState({response: response});
            });
        }
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="row">
                                <h1 className="heading">Flight Status: {this.state.departureAirport} - {this.state.arrivalAirport}</h1>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="row">
                                {this.state.departureAirport} to {this.state.arrivalAirport}
                            </div>

                            <ResultsGrid
                                departureAirport={this.state.departureAirport}
                                arrivalAirport={this.state.arrivalAirport}
                                departureDate={this.state.departureDate}
                                flightNumber={this.state.flightNumber}
                                response={this.state.response}
                            />
                        </div>
                    </div>
                </div>
    </div>
    );
    }
}

export default withRouter(FLightStatusResultsPage);