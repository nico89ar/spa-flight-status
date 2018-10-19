import React, { Component } from "react";
import ResultsRow from "./results-row";

class ResultsGridBody extends Component {

    renderRows () {
        if (this.props.response) {
            const results = this.props.response.data.searchResults;
            console.log(results);

            return(
                results.map((result, index)=>(
                    <ResultsRow
                        key={index}
                        result={result}
                    />
                ))
            )
        }
    }

    render(){
        return (
            <div>
                {this.renderRows()}
            </div>
        );
    }
}

export default ResultsGridBody;