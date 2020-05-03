import React from "react";
import { Form, Input, Button, Select } from "antd";

// import { insertData } from "../../util/api";

import "./Form.css";

export default class FormComponent extends React.Component {
    formRef = React.createRef();

    onFinish = async (values) => {
        try {
            await this.props.handleSubmitForm(values);
            //  Clear the form data
            this.formRef.current.resetFields();
            //  Make modal closed
            this.props.handleModalState(false);
        } catch (error) {}
    };

    render() {
        const { Option } = Select;
        return (
            <Form name="control-ref" ref={this.formRef} onFinish={this.onFinish}>
                <Form.Item
                    name="number"
                    label="Incident Number"
                    className="form-item"
                    rules={[{ required: true, message: "Please insert the Incident Number!" }]}
                >
                    <Input min={1} className="form-item" />
                </Form.Item>

                <Form.Item
                    name="state"
                    label="State type"
                    hasFeedback
                    className="form-item"
                    rules={[{ required: true, message: "Please select your Option!" }]}
                >
                    <Select placeholder="Please select a Option">
                        <Option value="Open">Open</Option>
                        <Option value="In Progress">In Progress</Option>
                        <Option value="Resolved">Resolved</Option>
                        <Option value="Closed">Closed</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="short_description"
                    label="Description"
                    className="form-item"
                    rules={[{ required: true, message: "Please enter the Descriptions!" }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item className="form-item">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
