import React, { Component } from "react";
import ResultsGridHeader from "./results-grid-header";
import ResultsGridBody from "./results-grid-body";

class ResultsGrid extends Component {

    render(){
        return (
            <div>
                <ResultsGridHeader
                    departureAirport={this.props.departureAirport}
                    arrivalAirport={this.props.arrivalAirport}
                    departureDate={this.props.departureDate}
                />
                <ResultsGridBody
                    response={this.props.response}
                />
            </div>
        );
    }
}

export default ResultsGrid;