class FlightNumberTextboxValidator {

    static validate(value, required) {
        var flightNumberIsValid = (!required || value > 0) && !isNaN(value) && value.length < 5;
        const errorMessage = flightNumberIsValid ? '' : 'Enter valid flight number.';
        return [value, errorMessage];
    }
}

export default FlightNumberTextboxValidator;