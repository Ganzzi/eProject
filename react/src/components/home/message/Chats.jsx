import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { MdOutlineDelete, MdReply } from "react-icons/md";
import { AiFillLike, AiOutlinePaperClip } from "react-icons/ai";
import React from "react";
// import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const Chats = ({ messagingTo, chatRoomId, currentUser }) => {
    const [chatData, setChatData] = useState([]);
    const [newChat, setnewChat] = useState({
        text: "",
        reply_to: null,
    });
    const [repliedText, setRepliedText] = useState("");

    const handleCreateChat = async (ev) => {
        ev.preventDefault();

        if (chatRoomId == null) {
            const data = {
                user_id: currentUser.id,
                user_id2: messagingTo.id,
            };
            let room_id;

            await axiosClient
                .post("/chatrooms", data)
                .then(async ({ data }) => {
                    room_id = data.chat_room_id;
                });

            await axiosClient
                .post("/chats", {
                    chat_room_id: room_id,
                    text: newChat.text,
                    reply_to: newChat.reply_to,
                })
                .then(async ({ data }) => {
                    // console.log(data);
                });
        } else {
            await axiosClient
                .post("/chats", {
                    chat_room_id: chatRoomId,
                    text: newChat.text,
                    reply_to: newChat.reply_to,
                })
                .then(async ({ data }) => {
                    // console.log(data);
                });
        }

        setnewChat({
            text: "",
            reply_to: null,
        });

        await fetchData();
    };

    const handleLikeChat = async (id) => {
        await axiosClient
            .post(`likechats`, {
                chat_id: id,
            })
            .then(async ({ data }) => {
                await fetchData();
            });
    };

    const fetchData = async () => {
        if (chatRoomId) {
            // Fetch chat data
            await axiosClient
                .get(`/chatrooms/${chatRoomId}`)
                .then(({ data }) => {
                    setChatData(data?.chats);
                });
        }
    };

    const handleDeleteChat = async (id) => {
        await axiosClient.delete(`/chats/${id}`).then(async () => {
            console.log("deleted");
            await fetchData();
        });
    };

    const handleReplyClick = (chat) => {
        if (newChat.reply_to === chat.chat_id) {
            // Nếu đang reply vào chat đã chọn, hủy bỏ reply
            setnewChat({
                ...newChat,
                reply_to: null,
            });
            setRepliedText("");
        } else {
            // Đặt giá trị reply_to và hiển thị repliedText
            setnewChat({
                ...newChat,
                reply_to: chat.chat_id,
            });

            for (let i = 0; i < chatData.length; i++) {
                if (chatData[i].chat_id === chat.chat_id) {
                    setRepliedText(chatData[i].text);
                }
            }
        }
    };

    useEffect(() => {
        setnewChat({
            text: "",
            reply_to: null,
        });
        // Fetch data initially
        fetchData();

        // Fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Clean up the interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [chatRoomId]);

    return (
        <main className="chats">
            {/* chat header */}
            <div className="chat-header">
                {messagingTo.image && (
                    <img
                        className="user-image"
                        src={
                            `${import.meta.env.VITE_BASE_URL}/api/images/` +
                            messagingTo.image
                        }
                        width={40}
                        height={40}
                        alt="Other User"
                    />
                )}
                <h2 className="user-name">{messagingTo.name}</h2>
            </div>

            {/* chat content */}
            <div className="chat-content">
                {chatData.map((chat) => {
                    const isLikedByCurrentUser = chat.likes.some(
                        (like) => like.liker === currentUser.id
                    );
                    return (
                        <div
                            key={chat.chat_id}
                            className={`chat-image ${
                                chat.sender_id === currentUser.id
                                    ? "chat-right"
                                    : "chat-left"
                            }`}
                        >
                            {/* neu ng gui ko phai minh thi hien hinh anh */}
                            {chat.sender_id !== currentUser.id && (
                                <img
                                    className="user-image"
                                    src={
                                        `${
                                            import.meta.env.VITE_BASE_URL
                                        }/api/images/` + messagingTo.image
                                    }
                                    width={30}
                                    height={30}
                                    alt="Other User"
                                />
                            )}

                            {chat.sender_id === currentUser.id && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <p>{chat?.likes.length} </p>
                                    <AiFillLike
                                        size={30}
                                        color={
                                            isLikedByCurrentUser
                                                ? "red"
                                                : "black"
                                        }
                                        onClick={() => {
                                            handleLikeChat(chat.chat_id);
                                        }}
                                    />

                                    {/* <div> */}
                                    {/* Hiển thị nút reply */}
                                    <MdReply
                                        size={30}
                                        color={
                                            newChat.reply_to === chat.chat_id
                                                ? "red"
                                                : "black"
                                        }
                                        onClick={() => handleReplyClick(chat)}
                                    />

                                    <MdOutlineDelete
                                        size={30}
                                        color={"red"}
                                        onClick={async () => {
                                            await handleDeleteChat(
                                                chat.chat_id
                                            );
                                        }}
                                    />
                                </div>
                            )}

                            {/* hien thi noi dung chat */}
                            <div className="each-chat">
                                <p className="message-text">{chat.text}</p>
                            </div>

                            {/* hien thi luot like, button de reply */}
                            {chat.sender_id !== currentUser.id && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <p>{chat?.likes.length} </p>
                                    <AiFillLike
                                        size={30}
                                        color={
                                            isLikedByCurrentUser
                                                ? "red"
                                                : "black"
                                        }
                                        onClick={() => {
                                            handleLikeChat(chat.chat_id);
                                        }}
                                    />

                                    <div>
                                        {/* Hiển thị nút reply */}
                                        <MdReply
                                            size={30}
                                            color={
                                                newChat.reply_to ===
                                                chat.chat_id
                                                    ? "red"
                                                    : "black"
                                            }
                                            onClick={() =>
                                                handleReplyClick(chat)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* chat input */}
            <div
                className="chat-input"
                style={{
                    position: "relative",
                }}
            >
                {newChat.reply_to && (
                    <div
                        className="position-absolute start-40 d-flex flex-row"
                        style={{
                            top: -30,
                            alignItems: "center",
                        }}
                    >
                        reply to {repliedText}
                        <button
                            className="btn btn-danger mx-2"
                            onClick={() =>
                                setnewChat({ ...newChat, reply_to: null })
                            }
                        >
                            X
                        </button>
                    </div>
                )}

                <form action="" className="d-flex" onSubmit={handleCreateChat}>
                    <div className="message-input-container">
                        {/* <div className="file-upload-container">
                            <input
                                type="file"
                                id="file-input"
                                className="file-input"
                                onChange={(ev) => {
                                    setnewChat({
                                        ...newChat,
                                        image: ev.target.files[0],
                                    });
                                }}
                            />
                            <label htmlFor="file-input">
                                <AiOutlinePaperClip size={24} />
                            </label>
                        </div> */}
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="input-type-message"
                            value={newChat.text}
                            onChange={(ev) => {
                                setnewChat({
                                    ...newChat,
                                    text: ev.target.value,
                                });
                            }}
                        />
                        <button type="submig" className="btn btn-primary">
                            Send
                        </button>
                    </div>

                    <style>
                        {`
                        .message-input-container {
                            display: flex;
                            align-items: center;
                            // border: 1px solid #ccc;
                            // // border-radius: 20px;
                            // padding: 0px;
                          }
                          
                          .input-type-message {
                            width: 50%;
                            flex: 1;
                            border: none;
                            outline: none;
                            padding: 6px;
                          }
                          
                          .file-upload-container {
                            position: relative;
                          }
                          
                          .file-input {
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 0;
                            height: 100%;
                            width: 100%;
                            cursor: pointer;
                          }
                          
                          .file-input-label {
                            display: flex;
                            align-items: center;
                            padding: 4px;
                            cursor: pointer;
                          }
                          
                          .file-input-label:hover {
                            background-color: #f2f2f2;
                            border-radius: 50%;
                          }                          
                        `}
                    </style>
                </form>
            </div>
        </main>
    );
};

export default Chats;
