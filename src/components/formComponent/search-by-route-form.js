import React, { Component } from 'react';
import moment from 'moment';
import AirportCodeTextbox from "./airport-code-textbox";
import DateDropdown from "./date-dropdown";
import FlightNumberTextbox from "./flight-number-textbox";
import AirportCodeTextboxValidator from "../../classes/formValidators/airportCodeTextboxValidator";
import DateDropdownValidator from "../../classes/formValidators/dateDropdownValidator";
import FlightNumberTextboxValidator from "../../classes/formValidators/flightNumberTextboxValidator";

class SearchByRouteForm extends Component {

    constructor() {
        super();
        var today = moment();
        var tomorrow = moment(today).add(1, 'days');
        var yesterday = moment(today).subtract(1, 'days');
        this.dateOptions = {today: today, tomorrow: tomorrow, yesterday:yesterday};

        this.state = {
            departureAirport: "",
            arrivalAirport: "",
            departureDate: "today",
            flightNumber: "",
            formErrors: {departureAirport: "", arrivalAirport: "", departureDate: "", flightNumber: ""}
        };
    }

    validateField(propertyName, value){
        var formErrors = this.state.formErrors;
        switch(propertyName) {
            case 'departureAirport':
                [value, formErrors.departureAirport] = AirportCodeTextboxValidator.validate(value, 'departure', this.state.arrivalAirport);
                break;
            case 'arrivalAirport':
                [value, formErrors.arrivalAirport] = AirportCodeTextboxValidator.validate(value, 'arrival', this.state.departureAirport);
                break;
            case 'departureDate':
                [value, formErrors.departureDate] = DateDropdownValidator.validate(value, Object.keys(this.dateOptions));
                break;
            case 'flightNumber':
                [value, formErrors.flightNumber] = FlightNumberTextboxValidator.validate(value, false);
                break;
            default:
                break;
        }
        this.setState({[propertyName]: value, formErrors: formErrors});
    }

    handleChange(propertyName, event) {
        this.setState({[propertyName]: event.target.value});
    }

    handleBlur(propertyName, event){
        this.validateField(propertyName, event.target.value);
    }

    handleSwap() {
        if(this.state.departureAirport !== this.state.arrivalAirport) {
            this.setState({
                arrivalAirport: this.state.departureAirport,
                departureAirport: this.state.arrivalAirport
            }, () => {
                this.validateField('departureAirport', this.state.departureAirport);
                this.validateField('arrivalAirport', this.state.arrivalAirport);
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>

                <div className="row top-buffer">
                    <div className="col">
                        <span className="required-asterisk">*</span> Required
                    </div>
                </div>

                <div className="row top-buffer">
                    <div className="col-md-5">
                        <AirportCodeTextbox
                            id="departure-code"
                            value={this.state.departureAirport}
                            label="DEPARTURE CITY OR AIRPORT CODE"
                            required
                            onBlur={this.handleBlur.bind(this, "departureAirport")}
                            onChange={this.handleChange.bind(this, "departureAirport")}
                            errorMessage={this.state.formErrors.departureAirport}
                        />
                    </div>

                    <a className="swap-button" onClick={this.handleSwap.bind(this)}><i className="fa fa-exchange" /></a>

                    <div className="col-md-5">
                        <AirportCodeTextbox
                            id="arrival-code"
                            value={this.state.arrivalAirport}
                            label="ARRIVAL CITY OR AIRPORT CODE"
                            required
                            onBlur={this.handleBlur.bind(this, "arrivalAirport")}
                            onChange={this.handleChange.bind(this, "arrivalAirport")}
                            errorMessage={this.state.formErrors.arrivalAirport}
                        />
                    </div>
                </div>

                <div className="row top-buffer">
                    <div className="col-md-5">
                        <DateDropdown
                            id="departure-date"
                            options={this.dateOptions}
                            defaultValue={this.state.departureDate}
                            label="DEPARTURE DATE"
                            required
                            onBlur={this.handleBlur.bind(this, "departureDate")}
                            onChange={this.handleChange.bind(this, "departureDate")}
                            errorMessage={this.state.formErrors.departureDate}
                        />
                    </div>
                    <div className="col-md-5">
                        <FlightNumberTextbox
                            id="flight-number"
                            value={this.state.flightNumber}
                            label="FLIGHT NUMBER"
                            onBlur={this.handleBlur.bind(this, "flightNumber")}
                            onChange={this.handleChange.bind(this, "flightNumber")}
                            errorMessage={this.state.formErrors.flightNumber}
                        />
                    </div>
                </div>

                <div className="row bottom-buffer">
                    <div className="col-md-10">
                        <input type="submit" className="submit-button" value="Search" />
                    </div>
                </div>
            </form>

        );
    }

}

export default SearchByRouteForm;