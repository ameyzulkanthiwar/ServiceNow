import React from "react";
import { Table } from "antd";

import "./TableComponent.css";

export default class TableComponent extends React.Component {
    render() {
        const { columns, data = {} } = this.props;
        return <Table columns={columns} dataSource={data} />;
    }
}
