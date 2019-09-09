import React, { Component } from "react"
import "./search.scss";

class search extends Component {
    constructor(props) {
        super(props);
    }

    keyDown = (e) => {
        if (e.key === "Enter") {
            window.location.href = `/profile/${document.getElementById("search").value}`;
        }
    }

    render() {
        return (
            <input id="search" className="searchbar" placeholder="Search for a player..." onKeyDown={this.keyDown}></input>
        )
    }
}

export default search;
