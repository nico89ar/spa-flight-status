import React, { Component } from 'react';
import '../../Assets/css/loadingStyles.min.css';

class SubmitButton extends Component {

    render() {
        return(
            <button type="submit" className={this.props.loading ? "actionable actionable_button actionable_no-outline swa-g-disabled actionable_primary button submit-button swa-g-disabled submit-button_searching" : "actionable actionable_button actionable_no-outline actionable_primary button submit-button"} >
                <span className="actionable--text">
                    <span className="submit-button--text">
                        Search
                    </span>
                    {this.props.loading && (
                        <div className="submit-button--loading-container">
                            <div type="box-dark" className="loading loading_box loading_box-dark submit-button--loading submit-button--loading_dark" aria-label="Loading.">
                                <div aria-hidden="true">
                                    <div style={{"animationDelay": "-3s"}} className="loading--box-item">
                                    </div>
                                    <div style={{"animationDelay": "-2.9s"}} className="loading--box-item">
                                    </div>
                                    <div style={{"animationDelay": "-2.8s"}} className="loading--box-item">
                                    </div>
                                    <div style={{"animationDelay": "-2.7s"}} className="loading--box-item">
                                    </div>
                                    <div style={{"animationDelay": "-2.6s"}} className="loading--box-item">
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </span>
            </button>
        );
    }
}

export default SubmitButton;


