import React from "react";
import { Button } from "antd";

import TableComponent from "../TableComponent/TableComponent";
import Loading from "../Loading/Loading";
import { getAllData, getDataByState, insertData } from "../../util/api";
import ModalComponent from "../ModalComponent/ModalComponent";
import CardContainer from "../Card/CardContainer";
import FormComponent from "../FormComponent/FormComponent";
import Error from "../Error/Error";

import "./Main.css";

export default class Main extends React.Component {
    state = {
        isLoading: true,
        isError: false,
        setFormError: false,
        isErrorCount: false,
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
            const data = await getAllData();
            this.handleCounts();

            this.setState((prevState) => {
                return {
                    ...prevState,
                    displayData: data,
                    allData: data
                };
            });
        } catch (error) {
            console.log("Error 1");
            this.setState({ isError: true });
        }
        this.setState({ isLoading: false });
    }

    handleCounts = () => {
        //  Schema for updating counts
        const countSchema = [
            ["openCount", "Open"],
            ["resolvedCount", "Resolved"],
            ["inProcessCount", "In Progress"],
            ["closedCount", "Closed"]
        ];

        countSchema.forEach(async (res) => {
            try {
                const data = await getDataByState([["state", res[1]]]);

                await this.setState((prevState) => {
                    return {
                        ...prevState,
                        isErrorCount: false,
                        [res[0]]: data && data.length
                    };
                });
            } catch (error) {
                console.log("Error 2");
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        isErrorCount: true
                    };
                });
            }
        });
    };

    handleDisplayState = async (state) => {
        await this.setState((prevState) => {
            return {
                ...prevState,
                displayState: state
            };
        });

        // Getting count for Open State
        if (this.state.displayState !== "") {
            try {
                const data = await getDataByState([["state", this.state.displayState]]);
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        displayData: data
                    };
                });
            } catch (error) {
                console.log("Error 3");
            }
        }
    };

    handleModalState = (value) => {
        // Updating the count after inserting a data
        this.handleCounts();

        this.setState((prevState) => {
            return {
                ...prevState,
                modalState: value,
                setFormError: false
            };
        });
    };

    handleSubmitForm = async (values) => {
        try {
            await insertData(values);
        } catch (error) {
            console.log("error 4");
            this.setState({ setFormError: true });
        }
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
            modalState,
            isError,
            isLoading,
            setFormError,
            isErrorCount
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

        if (isLoading) return <Loading />;
        if (isError) return <Error />;
        if (!isLoading && !isError) {
            return (
                <>
                    <div className="cards-title">At A Glance</div>

                    {isErrorCount ? (
                        <Error
                            className="error-set card-container-error"
                            errorText="Sorry Incident counts are not available.."
                        />
                    ) : (
                        <CardContainer
                            openCount={openCount}
                            inProcessCount={inProcessCount}
                            resolvedCount={resolvedCount}
                            closedCount={closedCount}
                            handleDisplayState={this.handleDisplayState}
                        />
                    )}
                    {/*  Button Grid system */}
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
                                className="all-data-button"
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
                                {setFormError ? (
                                    <Error
                                        className="error-set form-error"
                                        errorText="Sorry can not submit the form."
                                    />
                                ) : (
                                    <FormComponent
                                        submitButtonText={"Submit"}
                                        handleModalState={this.handleModalState}
                                        handleSubmitForm={this.handleSubmitForm}
                                    />
                                )}
                            </ModalComponent>
                        </div>
                    </div>

                    {allData && allData.length !== 0 ? (
                        <TableComponent
                            columns={columns}
                            data={displayState === "" ? allData : displayData}
                        />
                    ) : (
                        <Error
                            className="error-set table-error"
                            errorText="Sorry Table data is not available."
                        />
                    )}
                </>
            );
        }
    }
}
