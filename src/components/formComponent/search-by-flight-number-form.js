import React, { Component } from 'react';
import FlightNumberTextbox from "./flight-number-textbox";
import FlightNumberTextboxValidator from "../../classes/formValidators/flightNumberTextboxValidator";

class SearchByFlightNumberForm extends Component {

    constructor() {
        super();

        this.state = {
            flightNumber: "",
            formErrors: {flightNumber: ""}
        };
    }

    validateField(propertyName, value){
        var formErrors = this.state.formErrors;
        switch(propertyName) {
            case 'flightNumber':
                [value, formErrors.flightNumber] = FlightNumberTextboxValidator.validate(value, true);
                break;
            default:
                break;
        }
        this.setState({formErrors: formErrors});
    }

    handleChange(propertyName, event) {
        this.setState({[propertyName]: event.target.value});
    }

    handleBlur(propertyName, event){
        this.validateField(propertyName, event.target.value);
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
                    <div className="col-md-12">
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

export default SearchByFlightNumberForm;