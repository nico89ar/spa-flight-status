import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';


class AirportCodeTextbox extends Component {

    constructor(props) {
        super(props);
        this.state = {suggestions: []};
    }

    getSuggestions(value){
        return this.props.stations.filter(station =>
            station.toLowerCase().includes(value.toLowerCase())
        );
    };

    onSuggestionSelected(event, { suggestionValue }) {
        this.props.handleStationChange(this.props.name, suggestionValue);
    }

    getSuggestionValue(suggestion) {
        return suggestion;
    }

    renderSuggestion(suggestion) {
        return(
            <div>
                {suggestion}
            </div>
        );
    }

    shouldRenderSuggestions(value) {
        return value.length > 2;
    }

    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };

    handleBlurWithSuggestions(event, { highlightedSuggestion }) {
        if(highlightedSuggestion) {
            this.props.handleStationChange(this.props.name, highlightedSuggestion);
        } else if(this.state.suggestions.length > 0) {

            this.props.handleStationChange(this.props.name, this.state.suggestions[0]);
        } else {
            this.props.handleStationChange(this.props.name, this.props.value);
        }

    }

    render() {

        const theme = {
            container: 'autosuggest',
            input: 'form-control',
            suggestionsContainer: 'dropdown',
            suggestionsList: `dropdown-menu dropdown-menu-extension ${this.state.suggestions.length ? 'show' : ''}`,
            suggestion: 'dropdown-item dropdown-item-extension',
            suggestionFocused: 'active      ',
            suggestionHighlighted: 'suggestion-highlighted'
        };
        return(
            <div>
                <label className="form-label " htmlFor={this.props.id}>
                    {this.props.label} {this.props.required && <span className="required-asterisk">*</span>}
                </label>
                <br/>
                <Autosuggest
                    id={`${this.props.id}-autosuggest`}
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                    onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                    getSuggestionValue={this.getSuggestionValue.bind(this)}
                    renderSuggestion={this.renderSuggestion.bind(this)}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    highlightFirstSuggestion
                    theme={theme}
                    inputProps={{
                        id: `${this.props.id}-textbox`,
                        className: "airport-code-textbox",
                        value: this.props.value,
                        onChange:this.props.onChange,
                        onBlur:this.handleBlurWithSuggestions.bind(this)
                    }}
                />
                <span className="error-message">{this.props.errorMessage}</span>
            </div>
        );
    }
}

export default AirportCodeTextbox;