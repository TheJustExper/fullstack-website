import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Authentication from "../../Authentication";
import Moment from "moment";
import "./style.scss";

import Info from "./tabs/info";
import Following from "./tabs/following";
import Followers from "./tabs/followers";
import Stats from "./tabs/stats";
import Runs from "./tabs/runs";
import Credits from "./tabs/credits";

class index extends Component {
    constructor(props) {
        super(props);

        this.profileUrl = "http://localhost:8080/v1/profile?username=";
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.state = {
            myaccount: this.props.match.params.username === undefined,
            account: {},
            isHovering: false,
            pickedTab: <Info/>,
            activeTabName: "info",
            following: false,
            tabs: {
                info: <Info/>,
                following: <Following/>,
                followers: <Followers/>,
                stats: <Stats/>,
                runs: <Runs/>,
                credits: <Credits/>
            },
            buttons: [
                {
                    id: "info",
                    name: "Info",
                },
                {
                    id: "following",
                    name: "Following",
                },
                {
                    id: "followers",
                    name: "Followers",
                },
                {
                    id: "stats",
                    name: "Stats",
                },
                {
                    id: "runs",
                    name: "Runs",
                },
                {
                    id: "credits",
                    name: "Credits",
                }
            ]
        }

    }

    follow = (type) => {
        Authentication.follow(type, this.state.account).then(() => {
            Authentication.reloadAccountData()
            window.location.reload()
        });
    }

    tabClick = (id) => {
        this.setState(state => state.pickedTab = this.state.tabs[id]);
        this.setState(state => state.activeTabName = id);
    }

    getProfile(me) {
        const dis = this;
        const param = me ? JSON.parse(Authentication.getAccountData()).username : this.props.match.params.username;

        fetch(`${this.profileUrl}${param}`).then(response => response.json())
            .then(({ account }) => {
                if (account) {
                    dis.setState(state => state.account        = account)
                    dis.setState(state => state.tabs.followers = <Followers data={state.account.followers}/>);
                    dis.setState(state => state.tabs.following = <Following data={state.account.following}/>);
                    dis.setState(state => state.tabs.info      = <Info data={state.account.info}/>);
                    dis.setState(state => state.pickedTab      = state.tabs.info);
                    dis.setState(state => state.following      = state.account.followers.filter(n => n.username === JSON.parse(Authentication.getAccountData()).username));
                } else {
                    dis.setState(state => state.account = {});
                }
            });
    }

    componentDidMount() {
        if (Authentication.isLoggedIn()) {
            if (this.state.myaccount) {
                this.setState(state => state.myaccount = true);
                this.getProfile(true);
            } else {
                if (this.props.match.params.username === JSON.parse(Authentication.getAccountData()).username) {
                    this.setState(state => state.myaccount = true);
                    this.getProfile(true);
                } else {
                    this.getProfile(false);
                }
            }
        } else this.props.history.push("/auth/login");
    }
    
    getRelativeTime(date) {
        return Moment(date).fromNow();
    }

    handleMouseHover(e) {
        e.target.parentElement.getElementsByTagName("span")[0].style.display = "block"
    }

    handleMouseLeave(e) {
        e.target.parentElement.getElementsByTagName("span")[0].style.display = "none"
    }

    render() {
        return (
            <div id="profile-container">
                <div id="profile-background">
                    {Object
                        .entries(this.state.account)
                        .length > 0
                        ? <div className="outside">
                                <div className="content">
                                    <img alt="profile logo" className="logo" src={this.state.account.img}/>
                                    <div className="info">
                                        <h1>{this.state.account.username}</h1>
                                        <b>Level: 1{this.state.account.level}</b>
                                        {!this.state.myaccount
                                            ? !this.state.following.length > 0
                                                ? <div className="buttons">
                                                        <button className="follow" onClick={() => this.follow(1)}>Follow</button>
                                                        <button className="block" onClick={this.block}>Block</button>
                                                    </div>
                                                : <div className="buttons">
                                                        <button className="unfollow" onClick={() => this.follow(2)}>Unfollow</button>
                                                        <button className="block" onClick={this.block}>Block</button>
                                                    </div>
                                            : ""}
                                    </div>
                                </div>
                                <div className="side">
                                    <div className="badges">
                                        <h1>Badges</h1>
                                        <div className="badges-feed">
                                            <div className="row">
                                                <div className="badge-outer">
                                                    <img className="badge" src="https://momentum-mod.org/assets/images/badges/BadgeAdmin.png" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave}/>
                                                    <span style={{ display: "none" }}>Admin</span>
                                                </div>         
                                                <div className="badge-outer">
                                                    <img className="badge" src="https://image.flaticon.com/icons/svg/891/891448.svg" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave}/>
                                                    <span style={{ display: "none" }}>New player</span>
                                                </div>     
                                                <div className="badge-outer">
                                                    <img className="badge" src="https://image.flaticon.com/icons/svg/199/199533.svg" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave}/>
                                                    <span style={{ display: "none" }}>First map world record</span>
                                                </div>   
                                                <div className="badge-outer">
                                                    <img className="badge" src="https://image.flaticon.com/icons/svg/1949/1949434.svg" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave}/>
                                                    <span style={{ display: "none" }}>First bonus world record</span>
                                                </div>
                                            </div>                   
                                        </div>
                                    </div>
                                    <div className="quickstats">
                                        <h1>Quick Stats</h1>
                                        <div className="stats-feed">
                                            <div className="stats-bar">
                                                <div className="stats-box">
                                                    <b>Maps completed</b>
                                                    <p className="right">20</p>
                                                </div>
                                            </div>
                                            <div className="stats-bar">
                                                <div className="stats-box">
                                                    <b>Runs submitted</b>
                                                    <p className="right">12</p>
                                                </div>
                                            </div>
                                            <div className="stats-bar">
                                                <div className="stats-box">
                                                    <b>Strafes</b>
                                                    <p className="right">1375</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : <div className="content">
                            <h1>No account with that name</h1>
                        </div>}
                    <div className="bottom">
                        { this.state.buttons.map(button => 
                            <span onClick={e => this.tabClick(button.id)} id={button.id} className={this.state.activeTabName === button.id ? "tab-button active-tab" : "tab-button"}>{button.name}</span>
                        )}
                    </div>
                </div>
                {this.state.pickedTab}
                <div className="activity tab">
                    <h1>Activity</h1>
                    <div className="activity-feed">
                    {this.state.account.activity
                                            ? this
                                                .state
                                                .account
                                                .activity
                                                .map(data => <div className="activity-bar">
                                                    <img alt="activity feed logo" src={this.state.account.img}/>
                                                    <div className="text-box">
                                                        <p>
                                                            <b>{this.state.account.username}</b>
                                                            <b
                                                                style={{
                                                                color: `${data.color}`
                                                            }}>{data.text}</b>
                                                            <p className="right">{this.getRelativeTime(data.time)}</p>
                                                        </p>
                                                    </div>
                                                </div>)
                                            : ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(index);