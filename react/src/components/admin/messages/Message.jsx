import React, { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

export default function Message() {
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
            .get("/chatrooms")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setMessage(data);
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
                <h1>Message Room</h1>
                <Link className="btn-add" to="/admin/message/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Users</th>
                            <th>Messages</th>
                            <th>Create at</th>
                            <th>Update_at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {message.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>
                                        {m.users.map((user) => (
                                            <p>{user.email}</p>
                                        ))}
                                    </td>
                                    <td>
                                        {m.chats.map((chat) => (
                                            <p>{chat.text}</p>
                                        ))}
                                    </td>
                                    <td>{m.created_at}</td>
                                    <td>{m.updated_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/admin/messages/" + m.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={(ev) =>
                                                onDeleteClick(m.Message_Id)
                                            }
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
