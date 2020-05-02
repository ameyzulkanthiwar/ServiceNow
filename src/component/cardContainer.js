import React, { Fragment } from "react";

import CardComponent from "./cardComponent/cardComponent";

import "./main.css";

export default class CardContainer extends React.Component {
    render() {
        const { openCount, inProcessCount, resolvedCount, closedCount } = this.props;

        return (
            <Fragment>
                <div className="card-grid">
                    <CardComponent
                        title="Open"
                        count={openCount}
                        bordered={true}
                        handleDisplayState={this.props.handleDisplayState}
                    ></CardComponent>
                    <CardComponent
                        title="In Progress"
                        count={inProcessCount}
                        bordered={true}
                        handleDisplayState={this.props.handleDisplayState}
                    ></CardComponent>
                    <CardComponent
                        title="Resolved"
                        count={resolvedCount}
                        bordered={true}
                        handleDisplayState={this.props.handleDisplayState}
                    ></CardComponent>
                    <CardComponent
                        title="Closed"
                        count={closedCount}
                        bordered={true}
                        handleDisplayState={this.props.handleDisplayState}
                    ></CardComponent>
                </div>
            </Fragment>
        );
    }
}
