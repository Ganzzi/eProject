import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/Ri";
import { ImReply } from "react-icons/im";
import { MdOutlineCancel, MdOutlineSettingsSuggest } from "react-icons/md";

import { useStateContext } from "../../../contexts/ContextProvider";
import RepliedCommentCard from "./RepliedCommentCard";
import axiosClient from "../../../axios-client";
import { formatDateTime } from "../../../utils";

const CommentCard = ({ cmt, getPostData, onReply }) => {
    const { user, setAlerts } = useStateContext();
    const [isLiked, setIsLiked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newComment, setNewComment] = useState("");

    const checkIsLiked = () => {
        let _isLiked = false;
        for (let i = 0; i < cmt.likes.length; i++) {
            if (user.id == cmt.likes[i].liker_id) {
                _isLiked = true;
            }
        }
        setIsLiked(_isLiked ? true : false);
    };

    useEffect(() => {
        checkIsLiked();
    }, [cmt]);

    const handleLikeComment = async (id) => {
        await axiosClient
            .post(`/likecomments`, {
                comment_id: id,
            })
            .then(async ({ data }) => {
                setAlerts({
                    type: "info",
                    message: `${
                        isLiked
                            ? "unliked comment successfully"
                            : "liked comment successfully"
                    }`,
                    time: new Date(),
                });
                await getPostData();
                setIsLiked(!isLiked);
            });
    };

    const handleUpdateComment = async (id) => {
        const commentUppdate = {
            text: newComment,
        };

        try {
            await axiosClient
                .put(`comments/${cmt.id}`, commentUppdate)
                .then(async ({ data }) => {
                    setAlerts({
                        type: "info",
                        message: "updated comment successfully",
                        time: new Date(),
                    });
                    await getPostData();
                    setIsUpdating(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async () => {
        await axiosClient
            .delete(`comments/${cmt.id}`)
            .then(async ({ data }) => {
                setAlerts({
                    type: "info",
                    message: "deleted comment successfully",
                    time: new Date(),
                });

                await getPostData();
            });
    };

    return (
        <div className="card">
            <div className="card-body p-2">
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={
                            `${import.meta.env.VITE_BASE_URL}/api/images/` +
                            cmt.user_image
                        }
                        alt="Commentor Image"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                    />
                    <div>
                        <h6 className="card-title ml-2 mb-0">
                            {cmt.user_name}
                        </h6>
                        <p className="card-subtitle text-muted font-size-sm">
                            {formatDateTime(cmt.created_at)}
                        </p>
                    </div>
                    <ImReply
                        size={24}
                        color={"gray"}
                        onClick={() => {
                            onReply(cmt.id);
                        }}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        right: 40,
                        top: 40,
                    }}
                >
                    {user.id === cmt.commentor_id && (
                        <>
                            {isUpdating ? (
                                <>
                                    <RiDeleteBinLine
                                        size={30}
                                        onClick={() => deleteComment()}
                                    />
                                    <MdOutlineCancel
                                        size={20}
                                        onClick={() => {
                                            setIsUpdating(false);
                                        }}
                                    />
                                </>
                            ) : (
                                <MdOutlineSettingsSuggest
                                    size={20}
                                    onClick={() => {
                                        setIsUpdating(true);
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
                {isUpdating ? (
                    <div className="d-flex">
                        <input
                            type="text"
                            defaultValue={cmt.text}
                            onChange={(ev) => {
                                setNewComment(ev.target.value);
                            }}
                        />
                        {/* <button
                            onClick={() => {
                                handleUpdateComment();

                            onChange={(ev) =>
                            {
                                setNewComment(ev.target.value);
                            }}
                        /> */}
                        <button
                            onClick={() => {
                                handleUpdateComment(cmt.id);
                            }}
                        >
                            update
                        </button>
                    </div>
                ) : (
                    <p className="card-text font-size-sm">{cmt.text}</p>
                )}

                <div className="">
                    <div className="text-muted font-size-sm d-flex justify-content-between align-items-center">
                        <span className="mr-2 d-flex justify-content-center items-center text-3xl">
                            <AiFillHeart
                                size={24}
                                color={isLiked ? "red" : "gray"}
                                onClick={async () => {
                                    await handleLikeComment(cmt.id);
                                }}
                            />
                            {cmt?.likes?.length}
                        </span>
                        <span style={{}}>
                            {cmt?.reply_to?.length}
                            <AiOutlineComment size={24} color={"blue"} />
                            {cmt.replierComments.length}
                        </span>
                    </div>
                </div>

                {/* display replied comments */}
                <div className="replied-comments">
                    {cmt.replierComments.map((cmt, index) => (
                        <RepliedCommentCard
                            getPostData={getPostData}
                            onUpdate={(id) => {
                                handleUpdateComment(id);
                            }}
                            cmt={cmt}
                            key={index}
                        />
                    ))}
                    {/* Add more replied comments here */}
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
