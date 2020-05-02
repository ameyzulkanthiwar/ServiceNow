import React from "react";
import { Spin } from "antd";
import "./main.css";

function Loading() {
    return (
        <div className="spin">
            <Spin></Spin>
        </div>
    );
}

export default Loading;
