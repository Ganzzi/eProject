import React, { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

export default function ChatRooms(){
    const [ChatRooms, setChatrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getChatroom();
    }, []);

    const onDeleteClick = (ChatRooms_id) => {
        if (!window.confirm("Are you sure you want to delete this chatrooms?")) {
            return;
        }
        axiosClient.delete(`/admin/chatrooms/${ChatRooms_id}`).then(() => {
            setNotification("chatrooms was successfully deleted");
            getChatroom();
        });
    };

    const getChatroom = () => {
        setLoading(true);
        axiosClient
            .get("/admin/chatrooms")
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
                <h1 style={{fontFamily:"fantasy",
           justifycontent: "space-between",
            }}>chatrooms</h1>
                {/* <Link className="btn-add" to="/admin/chatrooms/new">
                    Add new
                </Link> */}
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr  style={{
                            fontFamily:"cursive",textAlign:"center",padding:"40px",
                        }}>
                           
                            <th>Id</th>
                            <th>Chats</th>
                            <th>Users</th>
                            <th>Created at</th>
                            <th>Updated at</th>
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
                            {ChatRooms.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.chats.length}</td>
                                    <td>{m.users.length}</td>
                                    <td>{m.created_at}</td>
                                    <td>{m.updated_at}</td>
                                    
                                    <td>
                                        {/* <Link
                                            className="btn-edit"
                                            to={"/admin/chatrooms/" + m.id}
                                        >
                                            Edit
                                        </Link> */}
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() => onDeleteClick(m.id)}
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
