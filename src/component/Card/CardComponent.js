import React from "react";

import "./Card.css";

export default class CardComponent extends React.Component {
    handleClick = () => {
        const { handleDisplayState, title } = this.props;
        handleDisplayState(title);
    };

    render() {
        const { count, title } = this.props;
        return (
            <div className="card-container" onClick={this.handleClick}>
                <div>{title}</div>
                <hr></hr>
                <div className="count-style">{count}</div>
            </div>
        );
    }
}
