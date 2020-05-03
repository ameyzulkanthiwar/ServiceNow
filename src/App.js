import React from "react";
import "./App.css";
import { PageHeader } from "antd";
import Main from "./component/MainComponent/Main";

function App() {
    return (
        <div className="App">
            <PageHeader className="site-page-header" title="ServiceNow" subTitle="" />
            <Main></Main>
        </div>
    );
}

export default App;
