import React, { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

export default function Posts() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getPost();
    }, []);

    const onDeleteClick = (post_id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        axiosClient.delete(`/posts/${post_id}`).then(() => {
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
                console.log(data);
                setPost(data);
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
                            <th>Creator</th>
                            <th>Description</th>
                            <th>image</th>
                            <th>Update at</th>
                            <th>Action</th>
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
                            {posts.map((p) => (
                                <tr key={p.Post_Id}>
                                    <td>{p.Post_Id}</td>
                                    <td>{p.Creator_Id}</td>
                                    <td>{p.Description}</td>
                                    <td>{p.Field}</td>
                                    <td>{p.Image}</td>
                                    <td>{p.Post_Id}</td>
                                    <td>{p.UserImage}</td>
                                   
                                    <td>{p.updated_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/admin/posts/" + p.post_id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() => onDeleteClick(p.Post_Id)}
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
