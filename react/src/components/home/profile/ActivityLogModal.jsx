import React, { useState, useEffect } from "react";

import axiosClient from "../../../axios-client";
import { formatDateTime } from "../../../utils";

const ActivityLogModal = ({ closeModal }) => {
    const [activityLogs, setActivityLogs] = useState([]);

    useEffect(() => {
        fetchActivityLogs();
    }, []);

    const fetchActivityLogs = async () => {
        try {
            await axiosClient.get("/activities").then(({ data }) => {
                console.log(data);
                setActivityLogs(data);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (logId) => {
        try {
            await axiosClient.delete(`/activities/${logId}`);
            fetchActivityLogs();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="activity-log-modal" style={{}}>
            <div className="modal-header">
                <h2 className="modal-title">Activity Log</h2>
                <button
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                ></button>
            </div>

            {activityLogs.length != 0 ? (
                <div className="modal-body">
                    {activityLogs.map((log) => (
                        <div className="card mb-3" key={log.id}>
                            <div
                                className="card-body d-flex"
                                style={{
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <h5 className="card-title">{log.type}</h5>
                                    <p className="card-text">{log.describe}</p>
                                </div>
                                <div
                                    className="d-flex"
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "end",
                                        alignItems: "end",
                                    }}
                                >
                                    <p className="card-text">
                                        {formatDateTime(log.created_at)}
                                    </p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(log.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="d-flex">
                    <p>There is none activity.</p>
                </div>
            )}
        </div>
    );
};

export default ActivityLogModal;
