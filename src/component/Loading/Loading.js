import React from "react";
import { Spin } from "antd";

import "./Loading.css";

function Loading() {
    return (
        <div className="spin">
            <Spin></Spin>
        </div>
    );
}

export default Loading;
