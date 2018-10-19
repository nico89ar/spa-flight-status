import React, { Component } from "react";
import FlightTime from "./flight-time";
import FlightDuration from "./flight-duration";
import FlightStops from "./flight-stops";

class ResultsRow extends Component {


    render(){
        return (
            <div className="row top-buffer">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            # {this.props.result.flightNumbers.join(' / ')}
                        </div>
                    </div>

                    <div className="row result-row">
                        <div className="col mx-auto">
                            <FlightTime time={this.props.result.summary.departureTime}/>
                        </div>
                        <div className="col mx-auto">
                            <FlightTime time={this.props.result.summary.arrivalTime}/>
                        </div>
                        <div className="col-md-4 mx-auto">
                            <div className="row">
                                <div className="col-md-3 offset-md-4">
                                    <FlightDuration duration={this.props.result.summary.totalDuration}/>
                                </div>
                                <div className="col">
                                    <FlightStops
                                        changePlanes={this.props.result.flightNumbers.length > 1}
                                        numberOfStops={this.props.result.summary.numberOfStops}
                                        stopsDetails={this.props.result.summary.stopsDetails}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="view-details-link">View Flight Status</div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}


export default ResultsRow;

