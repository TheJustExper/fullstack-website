import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

class Statistics extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div id="profile-statistics" className="tab">
                <h1>Credits</h1>
            </div>
        )
    }
}

export default withRouter(Statistics);