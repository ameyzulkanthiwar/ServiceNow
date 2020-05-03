import React from "react";

import CardComponent from "./CardComponent";

import "./Card.css";

export default class CardContainer extends React.Component {
    render() {
        const {
            openCount,
            inProcessCount,
            resolvedCount,
            closedCount,
            handleDisplayState
        } = this.props;

        return (
            <div className="card-grid">
                <CardComponent
                    title="Open"
                    count={openCount}
                    handleDisplayState={handleDisplayState}
                ></CardComponent>
                <CardComponent
                    title="In Progress"
                    count={inProcessCount}
                    handleDisplayState={handleDisplayState}
                ></CardComponent>
                <CardComponent
                    title="Resolved"
                    count={resolvedCount}
                    handleDisplayState={handleDisplayState}
                ></CardComponent>
                <CardComponent
                    title="Closed"
                    count={closedCount}
                    handleDisplayState={handleDisplayState}
                ></CardComponent>
            </div>
        );
    }
}
