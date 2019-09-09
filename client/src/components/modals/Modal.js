import React, { Component } from "react"
import "./Modal.scss";

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal">
                <span onClick={this.props.close} className="close">X</span>
                <div className="inner">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default Modal;
