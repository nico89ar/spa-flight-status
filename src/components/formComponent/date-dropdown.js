import React, { Component } from 'react';


class DateDropdown extends Component {

    render() {
        return(
            <div>
                <label className="form-label" htmlFor={this.props.id}>
                    {this.props.label}  {this.props.required && <span className="required-asterisk">*</span>}
                </label>
                <br/>
                <select id={this.props.id} className="date-dropdown" defaultValue={this.props.defaultValue} onChange={this.props.onChange} onBlur={this.props.onBlur}>
                    <option value="yesterday">Yesterday - {this.props.options.yesterday.format('ddd, MMM DD, Y')}</option>
                    <option value="today">Today - {this.props.options.today.format('ddd, MMM DD, Y')}</option>
                    <option value="tomorrow">Tomorrow - {this.props.options.tomorrow.format('ddd, MMM DD, Y')}</option>
                </select>
                <br/>
                <span className="error-message">{this.props.errorMessage}</span>
            </div>
        );
    }

}

export default DateDropdown;