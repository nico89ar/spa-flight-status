import React, { Component } from "react";

class FlightTime extends Component {

    constructor(props) {
        super(props);
        const time = this.props.time;
        this.hours = parseInt(time.substring(0,2));
    }


    render(){
        return (
            <div className="text-center">
                <span className="time-value">
                    {((this.hours + 11) % 12 + 1) + this.props.time.slice(2)}
                </span>
                <span className="time-period">
                    {this.hours > 11 ? "PM" : "AM"}
                </span>
            </div>
        );
    }
}


export default FlightTime;

