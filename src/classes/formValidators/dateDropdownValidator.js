class DateDropdownValidator {

    static validate(value, validValues) {
        var departureDateIsValid = validValues.includes(value);
        const errorMessage = departureDateIsValid ? '' : 'Enter valid departure date.';
        return [value, errorMessage];
    }
}

export default DateDropdownValidator;