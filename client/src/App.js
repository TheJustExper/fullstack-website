import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Index from "./pages/index/index.js";
import Login from "./pages/login/index.js";
import Profile from "./pages/profile/index.js";
import Dashboard from "./pages/dashboard/index.js";
import noPageFound from "./pages/noPageFound";

import "./pages/main.scss";
import Modal from "./components/modals/Modal";
import ProfileDropdown  from "./components/profile/profile";
import Search from "./components/search/search";

import Authentication from "./Authentication";

class App extends Component {
    constructor() {
        super();

        this.state = {
            showModal: false,
            loggedIn: Authentication.isLoggedIn()
        };

        this.docsModal = this.docsModal.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.account = JSON.parse(Authentication.getAccountData());

        //Authentication.register("MrBeast", "123");

        Authentication.authToken().then(e => console.log("Token is verified from localStorage to be working"))
            .catch(e => {
                Authentication.logout();
                this.logout();
                window.location.href = "/auth/login";
            });
    }

    docsModal() {
        this.setState(s => s.showModal = !s.showModal);
    }

    login() {
        this.setState(s => s.loggedIn = !s.loggedIn);
    }

    logout() {
        this.setState(s => s.loggedIn = !s.loggedIn);
        Authentication.logout();
        window.location.href = "/";
    }

    getLoggedIn() {
        if (this.state.loggedIn) {
            return (
                <div>
                           { this.state.showModal ? <div><div className="active"/>
                            <Modal close={this.docsModal}/></div> : "" }
                            <div id="header">
                                <h1>Website</h1>
                                <ul>
                                    <Search/>
                                    <Link className="router-to" to="/">Home</Link>
                                    <Link className="router-to" to="/profile">Profile</Link>
                                    <Link className="router-to" to="/dashboard">Dashboard</Link>
                                    <ProfileDropdown account={this.account} logout={this.logout}/>
                                </ul>
                            </div>
                            <Switch>
                                <Route exact path="/" render={props => <Index login={this.login} logout={this.logout}/>}/>
                                <Route path="/profile/:username?" render={props => <Profile {...props}/>}/>
                                <Route path="/dashboard" render={props => <Dashboard/>}/>
                                <Route path="/auth/login" render={props => <Login login={this.login} logout={this.logout}/>}/>
                                <Route component={noPageFound}/>
                            </Switch>
            
                </div>)
        } else {
            return (
                <div>                    
                        { this.state.showModal ? <div><div className="active"/><Modal close={this.docsModal}/></div> : "" }
                            <div id="header">
                                <h1>Website</h1>
                                <ul>
                                    <Link className="router-to" to="/">Home</Link>
                                    <li onClick={this.docsModal}>Docs</li>
                                    <Link className="router-to" to="/auth/login">Login</Link>
                                    <Link className="router-to" to="/auth/register">Register</Link>
                                </ul>
                            </div>
                            <Switch>
                                <Route exact path="/" render={props => <Index login={this.login} logout={this.logout}/>}/>
                                <Route path="/profile/:username?" render={props => <Profile {...props}/>}/>
                                <Route path="/auth/login" render={props => <Login login={this.login} logout={this.logout}/>}/>
                                <Route component={noPageFound}/>
                            </Switch>

                </div>)
        }
    }

    render() {
        return (
            <div id="container">
                <Router>
                { this.getLoggedIn() }
                </Router>
            </div>
        );
    }
}

export default App;
