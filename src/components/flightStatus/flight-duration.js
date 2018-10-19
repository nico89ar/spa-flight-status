import React, { Component } from "react";

class FlightDuration extends Component {

    formatDuration() {
        const minutes = this.props.duration % 60;
        const hours = (this.props.duration - minutes) / 60;

        return `${hours.toString()}h ${minutes}m`;

    }

    render(){
        return (
                <span className="flight-duration">
                    {this.formatDuration()}
                </span>
        );
    }
}


export default FlightDuration;
