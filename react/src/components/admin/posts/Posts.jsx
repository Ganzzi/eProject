import React, { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

export default function Posts () {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getPost();
    }, []);

    const onDeleteClick = (post) => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        axiosClient.delete(`/posts/${post.id}`).then(() => {
            setNotification("post was successfully deleted");
            getPost();
        });
    };

    const getPost = () => {
        setLoading(true);
        axiosClient
            .get("/posts")
            .then(({ data }) => {
                setLoading(false);
                setPost(data.data);
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
                <h1>Posts</h1>
                <Link className="btn-add" to="/admin/posts/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>image</th>
                            <th>Create at</th>
                            <th>Update at</th>
                            
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
                            {posts.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.description}</td>
                                    <td>{u.image}</td>
                                    <td>{u.created_at}</td>
                                    <td>{u.update_at}</td>
                                   
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/admin/posts/" + u.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={(ev) => onDeleteClick(u)}
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


