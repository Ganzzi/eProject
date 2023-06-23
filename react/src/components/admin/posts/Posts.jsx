import React, { useEffect } from "react";
import { useState ,} from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";
// import { Link } from "react-router-dom";

export default function Posts() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();

    useEffect(() => {
        getPost();
    }, []);

    const onDeleteClick = (post) => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        axiosClient.delete(`/admin/posts/${post_id}`).then(() => {
            setAlerts({
                type: "info",
                message: "post was successfully deleted",
                time: new Date(),
            });
            getPost();
        });
    };
   

    const getPost = () => {
        setLoading(true);
        axiosClient
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        fontFamily: "fantasy",
                        justifycontent: "space-between",
                    }}
                ></h1>
                {/* <Link className="btn-add" to="/admin/posts/new">
                    Add new
                </Link> */}
            </div>
            <div className="card animated fadeInDown" style={{ left: "2rem" }}>
                <table>
                    <thead>
                        <tr  style={{
                            fontFamily:"cursive",textAlign:"center",padding:"40px",
                        }}>
                            <th style={{paddingRight:"5rem"}}>ID</th>
                            <th  style={{paddingRight:"5rem"}}>Creator</th>
                            <th  style={{paddingRight:"5rem"}}>Description</th>
                            <th  style={{paddingRight:"5rem"}}>Comment</th>
                            <th  style={{paddingRight:"5rem"}}>image</th>
                            <th  style={{paddingRight:"5rem"}}>Update at</th>
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
                                        {/* <Link
                                            className="btn-edit"
                                            to={"/admin/posts/" + p.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp; */}
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