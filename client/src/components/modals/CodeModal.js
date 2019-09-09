import React, { Component } from "react"
import "./CodeModal.scss";

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="codemodal">
                <span onClick={this.props.close} className="close">X</span>
                <div className="inner">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default Modal;
