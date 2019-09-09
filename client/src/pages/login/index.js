import React, { Component } from 'react';
import "./file.scss";
import CodeModal from "../../components/modals/CodeModal";
import Authentication from "../../Authentication";

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMsg: "",
            showModal: false
        };

        this.login = this.login.bind(this);
        this.onClick = this.onClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.authCode = this.authCode.bind(this);
    }

    closeModal() {
        this.setState(s => s.showModal = !s.showModal);
    }

    login() {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        const dis = this;

        console.log(username.value.length, password.value.length, username.value.length > 0 && password.value.length > 0);

        if (username.value.length > 0 && username.value.length < 14) {
                if (password.value.length > 0) {
                    Authentication.login(username.value, password.value).then(() => {
                        //dis.closeModal();
                        window.location.href = "/";
                        dis.setState(s => s.errorMsg = "")
                        }).catch(e => {
                            dis.setState(s => s.errorMsg = e.msg)
                        });
                } else {
                    password.style.border = "1px solid #eb4335";
                    password.style["border-radius"] = "2px";
                }
        } else {
            username.style.border = "1px solid #eb4335";
            username.style["border-radius"] = "2px";
        }
    }

    authCode(evt) {
        const dis = this;
        const val = document.getElementById("authcode");


        if (val.value.length > 0) {
            Authentication.authCode(val.value).then(e => {
                dis.closeModal();
                dis.setState(s => s.errorMsg = "");
                dis.props.login();
                window.location.href = "/forums";
            }).catch(e => {
                val.style.border = "1px solid #eb4335";
                val.style["border-radius"] = "2px";
            });
        } else {
            val.style.border = "1px solid #eb4335";
            val.style["border-radius"] = "2px";
        }
    }


    onClick(evt) {
        console.log("Clicked")
        evt.target.style.border = "none";
    }

    render() {
        return (
            <div>
                { this.state.showModal ? <div><div className="active"/>
                    <CodeModal close={this.closeModal}>
                        <h1>Webdite</h1>
                        <p>To successfully login you need to type in the code that was sent to your email</p>
                        <input onClick={this.onClick} id="authcode" placeholder="Code here"/>
                        <button onClick={this.authCode}>Login</button>
                    </CodeModal></div> : "" }
                <div id="login-outer">
                    <div id="login">
                        <h1>Login to website</h1>
                        <p className="subtitle">or <a href="/register">create an account</a></p>
                        <label htmlFor="male">Username</label>
                        <input onClick={this.onClick} id="username" placeholder="Username"/>
                        <label htmlFor="male">Password</label>
                        <input onClick={this.onClick} id="password" placeholder="Password" type="password"/>
                        <p className="error">{ this.state.errorMsg }</p>
                        <p className="links">Before registering make sure you have read the <a href="/policy">Policy</a> and <a href="/tos">Terms of service</a></p>
                        <button id="submit" onClick={this.login}>Login</button>
                    </div>
                    <div id="information">
                        <h1>Information</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default login;