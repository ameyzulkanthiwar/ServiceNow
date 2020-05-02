import React, { Fragment } from "react";
import { Button } from "antd";

import CardComponent from "./cardComponent/cardComponent";
import TableComponent from "./TableComponent/TableComponent";
import Loading from "./Loading";
import { getAllData, insertData } from "../util/api";

import "./main.css";
import ModalComponent from "./ModalComponent/modalComponent";
import CardContainer from "./cardContainer";

export default class Main extends React.Component {
    state = {
        error: null,
        // We are storing data in two places here so we do not need to featch again and again
        allData: [],
        displayData: [],
        displayState: "",
        openCount: 0,
        inProcessCount: 0,
        resolvedCount: 0,
        closedCount: 0
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

    handleInser = async () => {
        // insertData([{ state: "Open" }, { number: 11111 }]);
        insertData([
            ["state", "Open"],
            ["number", 11111]
        ]);
    };

    render() {
        const {
            allData,
            displayData,
            openCount,
            inProcessCount,
            resolvedCount,
            closedCount,
            displayState
        } = this.state;

        // Table column strucher
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
                        {/* <div className="card-grid">
                            <CardComponent
                                title="Open"
                                count={openCount}
                                bordered={true}
                                handleDisplayState={this.handleDisplayState}
                            ></CardComponent>
                            <CardComponent
                                title="In Progress"
                                count={inProcessCount}
                                bordered={true}
                                handleDisplayState={this.handleDisplayState}
                            ></CardComponent>
                            <CardComponent
                                title="Resolved"
                                count={resolvedCount}
                                bordered={true}
                                handleDisplayState={this.handleDisplayState}
                            ></CardComponent>
                            <CardComponent
                                title="Closed"
                                count={closedCount}
                                bordered={true}
                                handleDisplayState={this.handleDisplayState}
                            ></CardComponent>
                        </div> */}

                        <CardContainer
                            openCount={openCount}
                            inProcessCount={inProcessCount}
                            resolvedCount={resolvedCount}
                            closedCount={closedCount}
                            handleDisplayState={this.handleDisplayState}
                        ></CardContainer>

                        {/*  Button grig syatem */}
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
                                    modalTitle={"Insert Insident"}
                                >
                                    aaa
                                </ModalComponent>
                                <Button onClick={() => this.handleInser()}>test</Button>
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
