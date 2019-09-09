import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Moment from "moment";

class Statistics extends Component {
    constructor(props) {
        super(props);
    }

    getRelativeTime(date) {
        return Moment(date).fromNow();
    }

    render() {
        return (
            <div id="profile-statistics" className="tab">
                <h1>Following</h1>
                {this.props.data.length > 0
                    ? this
                        .props
                        .data
                        .map(user => <div className="user-follower">
                            <a href={"/profile/" + user.username}><img alt="follower user logo" src={user.img}/></a>
                            <div className="box">
                                <a className="name" href={"/profile/" + user.username}>{user.username}</a>
                                <p>following since {this.getRelativeTime(user.joined)}</p>
                            </div>
                        </div>)
                    : "No one following"}
            </div>
        )
    }
}

export default withRouter(Statistics);