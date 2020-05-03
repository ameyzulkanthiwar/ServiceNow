import React, { Fragment } from "react";
import { Button } from "antd";

import TableComponent from "../TableComponent/TableComponent";
import Loading from "../Loading/Loading";
import { getAllData } from "../../util/api";
import ModalComponent from "../ModalComponent/ModalComponent";
import CardContainer from "../Card/CardContainer";
import FormComponent from "../FormComponent/FormComponent";

import "./Main.css";

export default class Main extends React.Component {
    state = {
        error: null,
        // We are storing data in two places here so we do not need to fetch again and again
        allData: [],
        displayData: [],
        displayState: "",
        openCount: 0,
        inProcessCount: 0,
        resolvedCount: 0,
        closedCount: 0,
        modalState: false
    };

    async componentDidMount() {
        try {
            console.log("try section");
            const data = await getAllData();
            console.log("Data:", data);
            data &&
                data.map(async (res) => {
                    // Geting count for Open State
                    if (res.state === "Open") {
                        await this.setState((prevState) => {
                            return {
                                ...prevState,
                                openCount: prevState.openCount + 1
                            };
                        });
                    }

                    // Geting count for Open State
                    if (res.state === "Resolved") {
                        await this.setState((prevState) => {
                            return {
                                ...prevState,
                                resolvedCount: prevState.resolvedCount + 1
                            };
                        });
                    }

                    // Geting count for In Progress State
                    if (res.state === "In Progress") {
                        await this.setState((prevState) => {
                            return {
                                ...prevState,
                                inProcessCount: prevState.inProcessCount + 1
                            };
                        });
                    }

                    // Geting count for Closed State
                    if (res.state === "Closed") {
                        await this.setState((prevState) => {
                            return {
                                ...prevState,
                                closedCount: prevState.closedCount + 1
                            };
                        });
                    }
                });
            await this.setState((prevState) => {
                return {
                    ...prevState,
                    displayData: data,
                    allData: data
                };
            });
            console.log("this.state:", this.state.data);
        } catch {
            console.log("error");
        }
    }

    filterData = async () => {
        console.log("................................");
        const updateData = this.state.allData.filter(
            (res) => res.state === this.state.displayState
        );
        console.log("Update Data: ", updateData);
        await this.setState((prevState) => {
            return {
                ...prevState,
                displayData: updateData
            };
        });
    };

    handleDisplayState = async (state) => {
        console.log("handle Displat state");
        await this.setState((prevState) => {
            return {
                ...prevState,
                displayState: state
            };
        });
        console.log("this.state:", this.state);

        if (this.state.displayState !== "") {
            this.filterData();
        }
    };

    handleModalState = (value) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modalState: value
            };
        });
    };

    render() {
        const {
            allData,
            displayData,
            openCount,
            inProcessCount,
            resolvedCount,
            closedCount,
            displayState,
            modalState
        } = this.state;

        // Table column stretcher
        const columns = [
            {
                title: "Number",
                dataIndex: "number",
                key: "number",
                width: "10%",
                render: (text) => <a>{text}</a>
            },
            {
                title: "Priority",
                dataIndex: "priority",
                key: "priority",
                width: "10%"
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description",
                width: "40%"
            },
            {
                title: "category",
                dataIndex: "category",
                key: "category",
                width: "10%"
            },
            {
                title: "State",
                dataIndex: "state",
                key: "state",
                width: "10%"
            },
            {
                title: "Created",
                dataIndex: "sys_created_on",
                key: "sys_created_on",
                width: "20%"
            }
        ];

        return (
            <Fragment>
                {allData.length === 0 ? (
                    <Loading></Loading>
                ) : (
                    <Fragment>
                        <div className="cards-title">At A Glance</div>

                        <CardContainer
                            openCount={openCount}
                            inProcessCount={inProcessCount}
                            resolvedCount={resolvedCount}
                            closedCount={closedCount}
                            handleDisplayState={this.handleDisplayState}
                        ></CardContainer>

                        {/*  Button grig system */}
                        <div className="display-container">
                            <div className="displaystate-text">
                                {displayState === "" ? <div> All Data </div> : displayState}
                            </div>
                            <div className="display-button-container">
                                <Button
                                    onClick={() => {
                                        this.setState({ displayState: "" });
                                    }}
                                    type="primary"
                                    disabled={displayState === "" ? true : false}
                                >
                                    Show All Data
                                </Button>

                                <ModalComponent
                                    modalButtonText={"Insert Data"}
                                    modalTitle={"Insert Incident"}
                                    modalState={modalState}
                                    handleModalState={this.handleModalState}
                                >
                                    <FormComponent
                                        handleModalState={this.handleModalState}
                                    ></FormComponent>
                                </ModalComponent>
                            </div>
                        </div>

                        <TableComponent
                            columns={columns}
                            data={displayState === "" ? allData : displayData}
                        ></TableComponent>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}
