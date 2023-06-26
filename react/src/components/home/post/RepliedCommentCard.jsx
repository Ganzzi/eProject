import React, { useState } from "react";
import { formatDateTime } from "../../../utils";
import { RiDeleteBinLine } from "react-icons/Ri";
import { MdOutlineCancel, MdOutlineSettingsSuggest } from "react-icons/md";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client";

const RepliedCommentCard = ({ cmt, getPostData }) => {
    const {user} = useStateContext()

    const [newComment, setNewComment] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateComment = async () => {

        const commentUppdate = {
            text: newComment,
        }

        try {
            await axiosClient.put(`comments/${cmt.id}`, commentUppdate).then(async ({ data }) => {
                await getPostData();
                setIsUpdating(false)
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async () => {
        await axiosClient.delete(`comments/${cmt.id}`).then(async({data}) => {
            console.log('deleted');

            await getPostData();

        })
    }

<<<<<<< HEAD
=======
const RepliedCommentCard = ({ cmt, onUpdate }) =>
{
    // onUpdate(id);
>>>>>>> a514bb2ffde93ad26a7f35e5bc21f1b4714e92bb
    return (
        <div className="card" style={{ opacity: "0.7" }}>
            <div className="card-body p-2">
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={
                            "http://127.0.0.1:8001/api/images/" + cmt.user_image
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
                                <RiDeleteBinLine size={30}
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
                                setNewComment(
                                    ev.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                handleUpdateComment();
                            }}
                        >
                            update
                        </button>
                    </div>
                ) : (
                    <p className="card-text font-size-sm">{cmt.text}</p>
                )}
            </div>
        </div>
    );
};

export default RepliedCommentCard;