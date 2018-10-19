import React, { Component } from "react";

class FlightStops extends Component {

    renderStop() {
        if (this.props.changePlanes) {
           return `Plane change ${this.props.stopsDetails[0].destinationAirportCode}`;
        } else {
            return 'no plane change';
        }
    }

    renderNumberOfStops() {
        const numberofStops = this.props.numberOfStops;
        if(numberofStops === 0) {
            return 'Nonstop';
        } else if(numberofStops === 1) {
            return '1 Stop';
        } else {
            return numberofStops + ' Stops'
        }
    }

    render(){
        return (
            <span className="flight-stops">
                {this.renderNumberOfStops()} - {this.renderStop()}
            </span>
        );
    }
}


export default FlightStops;
