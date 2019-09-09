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
                <h1>Info</h1>
                <p>{this.props.data}</p>
            </div>
        )
    }
}

export default withRouter(Statistics);