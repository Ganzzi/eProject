import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { ImReply } from "react-icons/im";
import { formatDateTime } from "../../../utils";

const CommentCard = ({ cmt }) => {
    return (
        <div className="card">
            <div className="card-body p-2">
                <div className="d-flex align-items-center mb-2">
                    <img
                        src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
                        alt="Commentor Image"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                    />
                    <div>
                        <h6 className="card-title ml-2 mb-0">Commentor Name</h6>
                        <p className="card-subtitle text-muted font-size-sm">
                            {formatDateTime(cmt.created__at)}
                        </p>
                    </div>
                    <ImReply size={24} color={"gray"} />
                </div>
                <p className="card-text font-size-sm">{cmt.text}</p>
                <div className="">
                    <div className="text-muted font-size-sm d-flex justify-content-between align-items-center">
                        <span className="mr-2 d-flex justify-content-center items-center text-3xl">
                            <AiFillHeart
                                size={24}
                                color={true ? "red" : "gray"}
                            />
                            {cmt?.likes?.length}
                        </span>
                        <span style={{}}>
                            {cmt?.reply_to?.length || 0}
                            <BiCommentDetail
                                size={24}
                                color={true ? "red" : "gray"}
                            />
                        </span>
                    </div>
                </div>
                <div className="replied-comments">
                    <div className="card" style={{ opacity: "0.7" }}>
                        <div className="card-body p-2">
                            <div className="d-flex align-items-center mb-2">
                                <img
                                    src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
                                    alt="Replied Commentor Image"
                                    className="rounded-circle"
                                    style={{ width: "20px", height: "20px" }}
                                />
                                <div>
                                    <h6 className="card-title ml-2 mb-0">
                                        Replied Commentor Name
                                    </h6>
                                    <p className="card-subtitle text-muted font-size-xs">
                                        Replied Comment Time
                                    </p>
                                </div>
                            </div>
                            <p className="card-text font-size-xs">
                                Replied Comment Description
                            </p>
                        </div>
                    </div>
                    {/* Add more replied comments here */}
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
