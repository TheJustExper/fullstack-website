import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import "./profile.scss";

class profile extends Component {
    constructor(props) {
        super(props);

        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
        };

        this.data = this.props.account;
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    navigate = (e, place) => {
        e.preventDefault();
       if (this.props.history.location.pathname.substr(1) === place) {
            window.location.href = "/" + place;
       } else {
           if (this.props.history.location.pathname.substr(1).includes("profile/") && place === "profile") {
                window.location.href = "/" + place;
           } else {
                this.props.history.push(`/${place}`);
           }
       }
    }

    render() {
        return (
            <div className="profile" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                <div className="profile-inside">
                    <img id="profile-image" alt="profile" src={this.data.img}/>
                    <div className="info">
                        <p id="profile-username">{this.data.username}</p>
                        <p id="profile-rank">Rank: {this.data.rank}</p>
                    </div>
                    <img id="arrow" alt="dropdown icon" src="https://image.flaticon.com/icons/svg/60/60995.svg"></img>
                </div>
                { this.state.isHovering ? 
                <div className="extended-profile">
                    <div className="profile-button" onClick={(e) => this.navigate(e, "dashboard")}>
                        <img alt="profile button" src="https://image.flaticon.com/icons/svg/74/74472.svg"></img>
                        <p>Dashboard</p>
                    </div>
                    <div className="profile-button" onClick={(e) => this.navigate(e, "profile")}>
                        <img alt="profile button" src="https://image.flaticon.com/icons/svg/74/74472.svg"></img>
                        <p>Profile</p>
                    </div>
                    <div className="profile-button" onClick={(e) => this.navigate(e, "account")}>
                        <img alt="profile button" src="https://image.flaticon.com/icons/svg/61/61135.svg"></img>
                        <p>Account</p>
                    </div>
                    <div className="profile-button" onClick={this.props.logout}>
                        <img alt="logout logo" src="https://png.pngtree.com/svg/20161205/a50c265b8b.svg"></img>
                        <p>Logout</p>
                    </div>
                </div> : "" }
            </div>
        )
    }
}

export default withRouter(profile);
