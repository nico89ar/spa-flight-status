import React, { Component } from 'react';
import FlightNumberTextbox from "./flight-number-textbox";
import FlightNumberTextboxValidator from "../../classes/formValidators/flightNumberTextboxValidator";
import {withRouter} from "react-router-dom";
import SubmitButton from "./submit-button";

class SearchByFlightNumberForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            flightNumber: "",
            flightNumberError: ""
        };
    }

    validateField(value){
        let flightNumberError;
        [value, flightNumberError] = FlightNumberTextboxValidator.validate(value, true);
        this.setState({flightNumberError: flightNumberError});
    }

    handleChange(event) {
        this.setState({flightNumber: event.target.value});
    }

    handleBlur(event){
        this.validateField(event.target.value);
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
                    <div className="col">
                        <FlightNumberTextbox
                            required
                            id="flight-number"
                            value={this.state.flightNumber}
                            label="FLIGHT NUMBER"
                            onBlur={this.handleBlur.bind(this)}
                            onChange={this.handleChange.bind(this)}
                            errorMessage={this.state.flightNumberError}
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

export default withRouter(SearchByFlightNumberForm);