import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { AiFillHeart } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/Ti";
import {RiDeleteBinLine  } from "react-icons/Ri";
import { MdOutlineCancel, MdOutlineSettingsSuggest } from "react-icons/md";
import { formatDateTime } from "../../../utils";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { BiCommentDetail } from "react-icons/Bi";

<<<<<<< HEAD
const PostCard = ({ post, post_creator, getPostData }) => {
=======
const PostCard = ({ post, post_creator, getPostData }) =>
{
    console.log(post);
>>>>>>> a514bb2ffde93ad26a7f35e5bc21f1b4714e92bb
    const { user } = useStateContext();
    const [comments, setcomments] = useState([]);
    const [isReplying, setIsReplying] = useState(false);
    const [repliedId, setRepliedId] = useState(null);
    const [isLikedPost, setIsLikedPost] = useState(false);
    const [isLikeOrUnlike, setisLikeOrUnlike] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);
    const [newPostForm, setNewPostForm] = useState({
        description: "",
    });
    
    const DeletePost=async ()=>{
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        await axiosClient.delete(`/admin/posts/${post.id}`).then(async() => {
            console.log('deleted');
            // setAlerts({
               
            // });

            setIsUpdating(false);

            await getPostData();
        });
    }

    useEffect(() =>
    {
        const checkRepliedCmt = () =>
        {
            const cmt = [];
            const repliedCmt = [];

            for (let i = 0; i < post.comments.length; i++)
            {
                if (post.comments[i].reply_to == null)
                {
                    cmt.push(post.comments[i]);
                } else
                {
                    repliedCmt.push(post.comments[i]);
                }
            }

            for (let i = 0; i < cmt.length; i++)
            {
                cmt[i].replierComments = [];

                for (let j = 0; j < repliedCmt.length; j++)
                {
                    if (cmt[i].id == repliedCmt[j].reply_to)
                    {
                        cmt[i].replierComments.push(repliedCmt[j]);
                    }
                }
            }

            // console.log(cmt);
            setcomments(cmt);
        };

        checkRepliedCmt();
        // return checkRepliedCmt();
    }, [post, post_creator]);

    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const handleCommentChange = (e) =>
    {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) =>
    {
        console.log(repliedId);
        e.preventDefault();
        // Perform comment submission logic
        setComment("");
        setRepliedId(null);
        setIsReplying(false)
        const formData = new FormData();
        formData.append("post_id", post.id);
        formData.append("text", comment);
        formData.append("reply_to", repliedId);

        await axiosClient.post("/comments", formData).then(async ({ data }) =>
        {
            await getPostData();
        });
    };
    const checkIsLikedPost = () =>
    {
        let _isLikedPost = false;
        for (let i = 0; i < post.likes.length; i++)
        {
            if (user.id == post.likes[i].liker_id)
            {
                _isLikedPost = true;
            }
        }
        setIsLikedPost(_isLikedPost ? true : false);
    };

    useEffect(() =>
    {
        checkIsLikedPost();
    }, [post, post_creator]);

    const handleLikePost = async () =>
    {
        console.log(post.id);
        await axiosClient
            .post("/likeposts", {
                post_id: post.id,
            })
            .then(async () =>
            {
                setisLikeOrUnlike(true);
                await getPostData();
                setIsLikedPost(!isLikedPost);
                setisLikeOrUnlike(false);
            });
    };

    const handleUpdatePost = async () =>
    {
        const postUppdate = {
            description: newPostForm?.description,
            creator_id: post_creator.id,
        };

        try
        {
            await axiosClient
                .put(`posts/${post.id}`, postUppdate)
                .then(async ({ data }) =>
                {
                    await getPostData();
                    setIsUpdating(false);
                });
        } catch (error)
        {
            console.log(error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3 justify-content-between">
                    <div className="d-flex align-items-center">
                        <img
                            src={
                                "http://127.0.0.1:8001/api/images/" +
                                post_creator.image
                            }
                            alt="Creator Image"
                            className="rounded-circle"
                            style={{ width: "50px", height: "50px" }}
                        />

                        <div>
                            <h5
                                className="card-title ml-3"
                                onClick={() =>
                                {
                                    console.log(post);
                                    navigate(`/profile/${post.creator_id}`);
                                }}
                            >
                                {post_creator.name}
                            </h5>
                            <p className="card-subtitle text-muted font-size-sm">
                                {formatDateTime(post.created_at)}
                            </p>
                        </div>
                    </div>
                    <div>
                        {/* update post button */}
                        {user.id === post.creator_id && (
                            <>
                             
                                {isUpdating ? (
                                    <>
                                    <RiDeleteBinLine size={30}
                              onClick={() => DeletePost(post.id)}

                             />
                                    <MdOutlineCancel
                                        size={40}
                                        onClick={() =>
                                        {
                                            setIsUpdating(false);
                                        }}
                                        />
                                        </>
                                ) : (
                                    <MdOutlineSettingsSuggest
                                        size={40}
                                        onClick={() =>
                                        {
                                            setIsUpdating(true);
                                        }}
                                    />      
                                )
                                }
                                {/* <RiDeleteBinLine/> */}
                            </>
                        )}
                    </div>
                </div>
                {isUpdating ? (
                    <div className="d-flex">
                        <input
                            type="text"
                            defaultValue={post.description}
                            onChange={(ev) =>
                            {
                                setNewPostForm({
                                    ...newPostForm,
                                    description: ev.target.value,
                                });
                            }}
                        />
                        <button
                            onClick={() =>
                            {
                                handleUpdatePost();
                            }}
                        >
                            update
                        </button>
                    </div>
                ) : (
                    <p className="card-text">{post.description}</p>
                )}
                <img
                    src={"http://127.0.0.1:8000/api/images/" + post.image}
                    alt="Post Image"
                    className="card-img-top"
                />
                <div className="d-flex justify-content-between mt-3">
                    {/* like button */}
                    <span className="mr-2 d-flex justify-content-center items-center text-3xl">
                        <AiFillHeart
                            size={24}
                            color={isLikedPost ? "red" : "gray"}
                            onClick={async () =>
                            {
                                await handleLikePost(post.id);
                            }}
                        />

                        {post.likes.length}
                    </span>
                    <span>
                        {post.comments.length}
                        <BiCommentDetail
                            size={24}
                            color={true ? "red" : "gray"}
                        />
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
                                position: "relative",
                                flex: 1,
                            }}
                        >
                            {isReplying && (
                                <>
                                    <p
                                        className="absolute-text"
                                        style={{
                                            position: "absolute",
                                            left: 10,
                                            transform: "translateY(-50%)",
                                            margin: 0,
                                            padding: "0 10px",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "gray",
                                        }}
                                    >
                                        reply to {}
                                    </p>
                                    <p
                                        className="absolute-text"
                                        style={{
                                            position: "absolute",
                                            left: 70,
                                            transform: "translateY(-50%)",
                                            margin: 0,
                                            padding: "0 10px",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "gray",
                                        }}
                                        onClick={() => setIsReplying(false)}
                                    >
                                        <TiDeleteOutline size={20} />
                                    </p>
                                </>
                            )}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={handleCommentChange}
<<<<<<< HEAD
                               />
=======
                            // onChange={(e) =>{
                            //     setComment(e.target.value);
                            //     console.log(description);
                            // }}
                            />
>>>>>>> a514bb2ffde93ad26a7f35e5bc21f1b4714e92bb
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
                    {comments.map((cmt) =>
                    {
                        return (
                            <CommentCard
                                cmt={cmt}
                                getPostData={getPostData}
                                onReply={(id) =>
                                {
                                    setIsReplying(true);
                                    setRepliedId(id);
                                }}
                            />
                        );
                    })}
                    {/* Add more comments here */}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
