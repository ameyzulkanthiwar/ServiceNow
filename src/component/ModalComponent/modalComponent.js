import React from "react";
import { Modal, Button } from "antd";

export default class ModalComponent extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    render() {
        const { modalButtonText, modalTitle, children } = this.props;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    {modalButtonText}
                </Button>
                <Modal
                    title={modalTitle}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {children}
                </Modal>
            </div>
        );
    }
}
