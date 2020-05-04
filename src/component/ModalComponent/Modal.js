import React from "react";
import { Modal, Button } from "antd";

import "./Modal.css";

export default class ModalComponent extends React.Component {
    render() {
        const { modalButtonText, modalTitle, children, modalState, handleModalState } = this.props;
        return (
            <div>
                <Button type="primary" onClick={() => handleModalState(true)}>
                    {modalButtonText}
                </Button>
                <Modal
                    title={modalTitle}
                    visible={modalState}
                    onCancel={() => handleModalState(false)}
                >
                    {children}
                </Modal>
            </div>
        );
    }
}
