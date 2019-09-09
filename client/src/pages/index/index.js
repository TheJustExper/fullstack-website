import React from 'react';
import image from "../../images/site.png";

function index() {
        return (
            <div>
                <div id="header-top" className="head">
                    <div className="outer">
                        <div className="panel">
                            <h1 id="title">Momentum</h1>
                            <p className="subtitle">Website for the surfing application Momentum</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <button id="discord-login" className="button"><img src="https://cdn.iconscout.com/icon/free/png-256/discord-1-555369.png"/>Login with Discord
                            </button>
                            <button
                                id="normal-login"
                                className="button"
                                onClick={() => window.location.href = "/auth/login"}>Login through website</button>
                        </div>
                        <img className="bg" src={image}/>
                    </div>
                </div>
                <div></div>
            </div>
        )
}

export default index;