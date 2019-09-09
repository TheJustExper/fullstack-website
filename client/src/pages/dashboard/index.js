import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Authentication from "../../Authentication";
import Moment from "moment";
import "./style.scss";

class dashboard extends Component {
    constructor(props) {
        super(props);

        this.profileUrl = "http://localhost:8080/v1/profile?username=";

        this.state = {}
        
    }
    
    getRelativeTime(date) {
        return Moment(date).fromNow();
    }

    render() {
        return (
            <div id="dashboard">
                <div className="sidebar">
                    <div className="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" class="eva eva-home" fill="currentColor"><g data-name="Layer 2"><g data-name="home"><rect width="24" height="24" opacity="0"></rect><rect x="10" y="14" width="4" height="7"></rect><path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2H8v-9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v9h3.11A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44z"></path></g></g></svg>
                        <p>Dashboard</p>
                    </div>
                    <div className="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" class="eva eva-people" fill="currentColor"><g data-name="Layer 2"><g data-name="people"><rect width="24" height="24" opacity="0"></rect><path d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"></path><path d="M17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3z"></path><path d="M21 20a1 1 0 0 0 1-1 5 5 0 0 0-8.06-3.95A7 7 0 0 0 2 20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1"></path></g></g></svg>
                        <p>Community</p>
                    </div>
                    <div className="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" class="eva eva-cloud-download" fill="currentColor"><g data-name="Layer 2"><g data-name="cloud-download"><rect width="24" height="24" opacity="0"></rect><path d="M21.9 11c0-.11-.06-.22-.09-.33a4.17 4.17 0 0 0-.18-.57c-.05-.12-.12-.24-.18-.37s-.15-.3-.24-.44S21 9.08 21 9s-.2-.25-.31-.37-.21-.2-.32-.3L20 8l-.36-.24a3.68 3.68 0 0 0-.44-.23l-.39-.18a4.13 4.13 0 0 0-.5-.15 3 3 0 0 0-.41-.09h-.18A6 6 0 0 0 6.33 7h-.18a3 3 0 0 0-.41.09 4.13 4.13 0 0 0-.5.15l-.39.18a3.68 3.68 0 0 0-.44.23L4.05 8l-.37.31c-.11.1-.22.19-.32.3s-.21.25-.31.37-.18.23-.26.36-.16.29-.24.44-.13.25-.18.37a4.17 4.17 0 0 0-.18.57c0 .11-.07.22-.09.33A5.23 5.23 0 0 0 2 12a5.5 5.5 0 0 0 .09.91c0 .1.05.19.07.29a5.58 5.58 0 0 0 .18.58l.12.29a5 5 0 0 0 .3.56l.14.22a.56.56 0 0 0 .05.08L3 15a5 5 0 0 0 4 2 2 2 0 0 1 .59-1.41A2 2 0 0 1 9 15a1.92 1.92 0 0 1 1 .27V12a2 2 0 0 1 4 0v3.37a2 2 0 0 1 1-.27 2.05 2.05 0 0 1 1.44.61A2 2 0 0 1 17 17a5 5 0 0 0 4-2l.05-.05a.56.56 0 0 0 .05-.08l.14-.22a5 5 0 0 0 .3-.56l.12-.29a5.58 5.58 0 0 0 .18-.58c0-.1.05-.19.07-.29A5.5 5.5 0 0 0 22 12a5.23 5.23 0 0 0-.1-1z"></path><path d="M14.31 16.38L13 17.64V12a1 1 0 0 0-2 0v5.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3A1 1 0 0 0 12 21a1 1 0 0 0 .69-.28l3-2.9a1 1 0 1 0-1.38-1.44z"></path><rect width="24" height="24" opacity="0"></rect><path d="M21.9 11c0-.11-.06-.22-.09-.33a4.17 4.17 0 0 0-.18-.57c-.05-.12-.12-.24-.18-.37s-.15-.3-.24-.44S21 9.08 21 9s-.2-.25-.31-.37-.21-.2-.32-.3L20 8l-.36-.24a3.68 3.68 0 0 0-.44-.23l-.39-.18a4.13 4.13 0 0 0-.5-.15 3 3 0 0 0-.41-.09h-.18A6 6 0 0 0 6.33 7h-.18a3 3 0 0 0-.41.09 4.13 4.13 0 0 0-.5.15l-.39.18a3.68 3.68 0 0 0-.44.23L4.05 8l-.37.31c-.11.1-.22.19-.32.3s-.21.25-.31.37-.18.23-.26.36-.16.29-.24.44-.13.25-.18.37a4.17 4.17 0 0 0-.18.57c0 .11-.07.22-.09.33A5.23 5.23 0 0 0 2 12a5.5 5.5 0 0 0 .09.91c0 .1.05.19.07.29a5.58 5.58 0 0 0 .18.58l.12.29a5 5 0 0 0 .3.56l.14.22a.56.56 0 0 0 .05.08L3 15a5 5 0 0 0 4 2 2 2 0 0 1 .59-1.41A2 2 0 0 1 9 15a1.92 1.92 0 0 1 1 .27V12a2 2 0 0 1 4 0v3.37a2 2 0 0 1 1-.27 2.05 2.05 0 0 1 1.44.61A2 2 0 0 1 17 17a5 5 0 0 0 4-2l.05-.05a.56.56 0 0 0 .05-.08l.14-.22a5 5 0 0 0 .3-.56l.12-.29a5.58 5.58 0 0 0 .18-.58c0-.1.05-.19.07-.29A5.5 5.5 0 0 0 22 12a5.23 5.23 0 0 0-.1-1z"></path><path d="M14.31 16.38L13 17.64V12a1 1 0 0 0-2 0v5.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3A1 1 0 0 0 12 21a1 1 0 0 0 .69-.28l3-2.9a1 1 0 1 0-1.38-1.44z"></path></g></g></svg>
                        <p>Maps</p>
                    </div>
                    <div className="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" class="eva eva-bar-chart" fill="currentColor"><g data-name="Layer 2"><g data-name="bar-chart"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"></rect><path d="M12 4a1 1 0 0 0-1 1v15a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1z"></path><path d="M19 12a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1z"></path><path d="M5 8a1 1 0 0 0-1 1v11a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"></path></g></g></svg>
                        <p>Statistics</p>
                    </div>
                </div>
                <div className="main">

                </div>
            </div>
        )
    }
}

export default withRouter(dashboard);