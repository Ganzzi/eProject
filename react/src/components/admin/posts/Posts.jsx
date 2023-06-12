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
                <h1 style={{fontFamily:"fantasy",
           justifycontent: "space-between",
            }}>Posts</h1>
                <Link className="btn-add" to="/admin/posts/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr  style={{
                            fontFamily:"cursive",textAlign:"center",padding:"40px",
                        }}>
                            <th>ID</th>
                            <th>Creator</th>
                            <th>Description</th>
                            <th>Field</th>
                            <th>Comment</th>
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
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.creator_id}</td>
                                
                                    <td>{p.description}</td>
                                    <td>{p.field}</td>
                                   
                                    <td>{p.comments.length}</td>

                                    <td>
                                        <img
                                            src={
                                                "http://127.0.0.1:8000/api/images/" +
                                                p.image
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
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
