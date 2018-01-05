import React, { Component } from 'react';
import SearchByRouteForm from "../formComponent/search-by-route-form";


class SearchByRoutePage extends Component {

    render() {
        return (
            <div className="container container-centered">
                <SearchByRouteForm/>
            </div>
        );
    }
}

export default SearchByRoutePage;
