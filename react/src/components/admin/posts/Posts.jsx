import React, { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../../utils";

export default function Posts() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();

    useEffect(() => {
        getPost();
    }, []);

    const onDeleteClick = async (post_id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        await axiosClient.delete(`/admin/posts/${post_id}`).then(async () => {
            setAlerts({
                type: "info",
                message: "post was successfully deleted",
                time: new Date(),
            });
            await getPost();
        });
    };

    const getPost = async () => {
        setLoading(true);
        await axiosClient
            .get("/admin/posts")
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
            <div className="card animated fadeInDown" style={{ left: "2rem" }}>
                <table>
                    <thead>
                        <tr
                            style={{
                                fontFamily: "cursive",
                                textAlign: "center",
                                padding: "40px",
                            }}
                        >
                            <th style={{ paddingRight: "5rem" }}>ID</th>
                            <th style={{ paddingRight: "5rem" }}>Creator</th>
                            <th style={{ paddingRight: "5rem" }}>
                                Description
                            </th>
                            <th style={{ paddingRight: "5rem" }}>Comment</th>
                            <th style={{ paddingRight: "5rem" }}>image</th>
                            <th style={{ paddingRight: "5rem" }}>Update at</th>
                            <th style={{ paddingRight: "5rem" }}>lock</th>
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

                                    <td>{p.comments.length}</td>
                                    <td>
                                        <img
                                            src={
                                                `${
                                                    import.meta.env
                                                        .VITE_BASE_URL
                                                }/api/images/` + p.image
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
                                    <td>{formatDateTime(p.updated_at)}</td>
                                    <td>{p.lock == 0 ? "Unlock" : "Locked"}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/admin/posts/" + p.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() => onDeleteClick(p.id)}
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
