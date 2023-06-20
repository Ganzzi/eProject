import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { ImReply } from "react-icons/im";
import { formatDateTime } from "../../../utils";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

const CommentCard = ({ cmt, getPostData, onReply }) => {
    const { user } = useStateContext();
    const [reply_to, setreply_to] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isLikeOrUnlikeSuccess, setisLikeOrUnlikeSuccess] = useState(false);

    const checkIsLiked = () => {
        // if (cmt?.likes.length != 0) {
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
                setisLikeOrUnlikeSuccess(true);
                await getPostData();
                setIsLiked(!isLiked);
                setisLikeOrUnlikeSuccess(false);
                // checkIsLiked();
            });
    };

    return (
        <div className="card">
            <div className="card-body p-2">
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={
                            "http://127.0.0.1:8000/api/images/" + cmt.user_image
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
                <p className="card-text font-size-sm">{cmt.text}</p>
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
                            {cmt?.reply_to?.length }
                            <BiCommentDetail size={24} color={"blue"} />
                        </span>
                    </div>
                </div>

                {/* display replied comments */}
                <div className="replied-comments">
                    {cmt.replierComments.map((cmt, index) => (
                        <div
                            key={index}
                            className="card"
                            style={{ opacity: "0.7" }}
                        >
                            <div className="card-body p-2">
                                <div className="d-flex align-items-center mb-2">
                                    <img
                                        src={
                                            "http://127.0.0.1:8000/api/images/" +
                                            cmt.user_image
                                        }
                                        alt="Replied Commentor Image"
                                        className="rounded-circle"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                    <div>
                                        <h6 className="card-title ml-2 mb-0">
                                            {cmt.user_name}
                                        </h6>
                                        <p className="card-subtitle text-muted font-size-xs">
                                            {formatDateTime(cmt.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <p className="card-text font-size-xs">
                                    {cmt.text}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Add more replied comments here */}
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
