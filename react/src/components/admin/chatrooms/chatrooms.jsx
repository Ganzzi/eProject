import React, { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

export default function chatrooms(){
    const [chatrooms, setChatroom] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getChatroom();
    }, []);

    const onDeleteClick = (chatrooms) => {
        if (!window.confirm("Are you sure you want to delete this chatrooms?")) {
            return;
        }
        axiosClient.delete(`/chatrooms/${chatrooms.id}`).then(() => {
            setNotification("chatrooms was successfully deleted");
            getChatroom();
        });
    };

    const getChatroom = () => {
        setLoading(true);
        axiosClient
            .get("/chatrooms")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
              setChatrooms(data);
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
                <h1>chatrooms</h1>
                <Link className="btn-add" to="/admin/chatrooms/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                           
                            <th>chat_room_id</th>
                           <th>text</th>
                           <th>sender id</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                          
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
                            {chatrooms.map((m) => (
                                <tr key={m.id}>
                                   
                                    <td>{m.chat_room_id}</td>
                                    <td>{m.text}</td>
                                    <td>{m.sender_id}</td>
                                    <td>{m.created_at}</td>
                                    <td>{m.updated_at}</td>
                                    
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/admin/chatrooms/" + m.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() => onDeleteClick(m.chatrooms_Id)}
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
