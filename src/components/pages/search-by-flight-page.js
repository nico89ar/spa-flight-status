import React, { Component } from 'react';
import SearchByFlightNumberForm from "../formComponent/search-by-flight-number-form";


class SearchByFlightPage extends Component {

    render() {
        return (
            <div className="container container-inner">
                <SearchByFlightNumberForm/>
            </div>
        );
    }
}

export default SearchByFlightPage;
