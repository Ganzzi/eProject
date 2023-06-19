import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { formatDateTime } from "../../../utils";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, user, getPostData }) => {
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // Perform comment submission logic
        setComment("");
        console.log(comment);
        const formData = new FormData();
        formData.append("post_id", post.id);
        formData.append("text", comment);
        formData.append("commentor_id", user.id);
        formData.append("reply_to", []);

        await axiosClient.post("/comments", formData).then(async ({ data }) => {
            console.log(data);
            getPostData();
        });
    };

    const handleLikePost = async () => {
        axiosClient.post("/likeposts", {
            post_id: post.id,
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3 justify-content-between">
                    <div className="d-flex align-items-center">
                        <img
                            src={
                                "http://127.0.0.1:8000/api/images/" + user.image
                            }
                            alt="Creator Image"
                            className="rounded-circle"
                            style={{ width: "50px", height: "50px" }}
                        />
                        <div>
                            <h5
                                className="card-title ml-3"
                                onClick={() => {
                                    console.log(post);
                                    navigate(`/profile/${post.creator_id}`);
                                }}
                            >
                                {user.name}
                            </h5>
                            <p className="card-subtitle text-muted font-size-sm">
                                {formatDateTime(post.created_at)}
                            </p>
                        </div>
                    </div>
                    <div>
                        <MdOutlineSettingsSuggest size={40} />
                    </div>
                </div>
                <p className="card-text">{post.description}</p>
                <img
                    src={"http://127.0.0.1:8000/api/images/" + post.image}
                    alt="Post Image"
                    className="card-img-top"
                />
                <div className="d-flex justify-content-between mt-3">
                    {/* like button */}
                    <span
                        className="mr-2 d-flex justify-content-center items-center text-3xl"
                        onClick={handleLikePost}
                    >
                        <AiFillHeart size={24} color={true ? "red" : "gray"} />
                        {post.likes.length}
                    </span>
                    <span>
                        <BiCommentDetail
                            size={24}
                            color={true ? "red" : "gray"}
                        />
                        {post.comments.length}
                    </span>
                </div>
                <div className="mt-3">
                    <h5>Comments</h5>
                    <form
                        onSubmit={handleCommentSubmit}
                        className="mt-3 d-flex justify-content-between items-center "
                    >
                        <div
                            className="form-group  d-flex items-center mx-2"
                            style={{
                                flex: 1,
                            }}
                        >
                            {true && (
                                <p
                                    className="absolute-text"
                                    style={{
                                        position: "absolute",
                                        left: 50,
                                        transform: "translateY(-50%)",
                                        margin: 0,
                                        padding: "0 10px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    reply to
                                </p>
                            )}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={handleCommentChange}
                                // onChange={(e) =>{
                                //     setComment(e.target.value);
                                //     console.log(description);
                                // }}
                            />
                        </div>
                        <button
                            type="submit"
                            variant="primary"
                            size="sm"
                            className="btn btn-primary mx-2"
                        >
                            Comment
                        </button>
                    </form>
                    {post.comments.map((cmt) => (
                        <CommentCard cmt={cmt} />
                    ))}
                    {/* Add more comments here */}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
