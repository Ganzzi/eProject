import React, { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

export default function Message(){
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getMessage();
    }, []);

    const onDeleteClick = (message) => {
        if (!window.confirm("Are you sure you want to delete this Message?")) {
            return;
        }
        axiosClient.delete(`/messages/${message.id}`).then(() => {
            setNotification("Message was successfully deleted");
            getMessage();
        });
    };

    const getMessage = () => {
        setLoading(true);
        axiosClient
            .get("/messages")
            .then(({ data }) => {
                setLoading(false);
                setMessage(data.data);
                console.log(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Message</h1>
                <Link className="btn-add" to="/admin/message/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>paticipant</th>
                            <th>text</th>
                            <th>Create at</th>
                          
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {message.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.paticipant}</td>
                                    <td>{u.text}</td>
                                    <td>{u.created_at}</td>
                                    
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/admin/messages/" + u.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={(ev) => onDeleteClick(ev)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
