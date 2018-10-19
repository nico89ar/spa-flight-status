import React, { Component } from 'react';
import moment from 'moment';
import AirportCodeTextbox from "./airport-code-textbox";
import DateDropdown from "./date-dropdown";
import FlightNumberTextbox from "./flight-number-textbox";
import AirportCodeTextboxValidator from "../../classes/formValidators/airportCodeTextboxValidator";
import DateDropdownValidator from "../../classes/formValidators/dateDropdownValidator";
import FlightNumberTextboxValidator from "../../classes/formValidators/flightNumberTextboxValidator";
import stations from '../../Assets/stations.json';
import {withRouter} from "react-router-dom";
import flightStatusClient from "../../classes/apiClients/flightStatusClient";
import SubmitButton from "./submit-button";

class SearchByRouteForm extends Component {

    constructor(props) {
        super(props);
        var today = moment();
        var tomorrow = moment(today).add(1, 'days');
        var yesterday = moment(today).subtract(1, 'days');
        this.dateOptions = {today: today, tomorrow: tomorrow, yesterday:yesterday};
        this.stations = this.getStations();
        this.state = {
            loading: false,
            departureAirport: "",
            arrivalAirport: "",
            departureDate: "today",
            flightNumber: "",
            formErrors: {departureAirport: "", arrivalAirport: "", departureDate: "", flightNumber: ""}
        };
    }

    getStations() {
        let fullDescriptionList = [];
        for(const entry in stations.airStations) {
            let station = stations.airStations[entry];
            const fullDescription = `${station.stationName}, ${station.stateFederalUnit} - ${station.airportCode}`
            fullDescriptionList.push(fullDescription);
        }
        return fullDescriptionList;
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

    handleStationChange(propertyName, value) {
        this.setState({[propertyName]: value},
            () => {this.validateField(propertyName, value)});
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
        for(let fieldName in this.state.formErrors) {
            this.validateField(fieldName, this.state[fieldName]);
            if(this.state.formErrors[fieldName]) {
                var formHasErrors = true;
            }
        }

        if(!formHasErrors) {
            this.setState({loading: true});
            flightStatusClient.getFlightStatus({
                departureDate: this.dateOptions[this.state.departureDate].format('Y-MM-DD'),
                departureAirport: this.state.departureAirport.substr(-3),
                arrivalAirport: this.state.arrivalAirport.substr(-3),
                flightNumber: this.state.flightNumber || ''
            }).then(response => {
                this.setState({loading: false});
                this.props.history.push({
                    pathname: '/flight-status/results',
                    search: this.buildSearchByRouteQuery(),
                    state: {response: response}
                });
            });
        }
    }


    buildSearchByRouteQuery() {
        const pathParams = '?departureDate=' + this.dateOptions[this.state.departureDate].format('Y-MM-DD')
            + '&departureAirport=' + this.state.departureAirport.substr(-3)
            + '&arrivalAirport=' + this.state.arrivalAirport.substr(-3)
            + '&flightNumber=' + this.state.flightNumber;

        return pathParams;
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>

                <div className="row top-buffer">
                    <div className="col">
                        <span className="required-asterisk">*</span> Required
                    </div>
                </div>

                <div className="row top-buffer">
                    <div className="col">
                        <AirportCodeTextbox
                            id="departure-code"
                            name={"departureAirport"}
                            value={this.state.departureAirport}
                            label="DEPARTURE CITY OR AIRPORT CODE"
                            stations={this.stations}
                            required
                            handleStationChange={this.handleStationChange.bind(this)}
                            onChange={this.handleChange.bind(this, "departureAirport")}
                            errorMessage={this.state.formErrors.departureAirport}
                        />
                    </div>

                    <a className="swap-button" onClick={this.handleSwap.bind(this)}><i className="fa fa-exchange" /></a>

                    <div className="col">
                        <AirportCodeTextbox
                            id="arrival-code"
                            name="arrivalAirport"
                            value={this.state.arrivalAirport}
                            label="ARRIVAL CITY OR AIRPORT CODE"
                            stations={this.stations}
                            required
                            handleStationChange={this.handleStationChange.bind(this)}
                            onChange={this.handleChange.bind(this, "arrivalAirport")}
                            errorMessage={this.state.formErrors.arrivalAirport}
                        />
                    </div>
                </div>

                <div className="row top-buffer">
                    <div className="col">
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
                    <div className="col">
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

                <div className="row top-buffer bottom-buffer">
                    <div className="col">
                        <SubmitButton loading={this.state.loading} />
                    </div>
                </div>
            </form>

        );
    }

}

export default withRouter(SearchByRouteForm);