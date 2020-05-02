import React from "react";
import { Card } from "antd";

import "./cardComponent.css";

export default class CardComponent extends React.Component {
    handleClick = () => {
        console.log("handle click");
        this.props.handleDisplayState(this.props.title);
    };

    render() {
        const { count, title, bordered } = this.props;
        // return(
        //     <Card
        //         title={title}
        //         bordered={bordered}
        //         style={{ width: "25%" }}
        //         onClick={() => this.handleClick()}
        //     >
        //         <div className="count-style">{count}</div>
        //     </Card>
        // )
        return (
            <div className="card-container" onClick={() => this.handleClick()}>
                <div>{title}</div>
                <hr></hr>
                <div className="count-style">{count}</div>
            </div>
        );
    }
}
