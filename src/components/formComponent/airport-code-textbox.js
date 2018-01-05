import React, { Component } from 'react';

class AirportCodeTextbox extends Component {

    render() {
        return(
            <div>
                <label className="form-label " htmlFor={this.props.id}>
                    {this.props.label} {this.props.required && <span className="required-asterisk">*</span>}
                </label>
                <br/>
                <input type="text" id={this.props.id} className="airport-code-textbox" value={this.props.value} onChange={this.props.onChange} onBlur={this.props.onBlur} />
                <br/>
                <span className="error-message">{this.props.errorMessage}</span>
            </div>
        );
    }
}

export default AirportCodeTextbox;