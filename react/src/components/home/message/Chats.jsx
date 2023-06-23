import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { MdReply } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

const Chats = ({ messagingTo, chatRoomId, currentUser }) => {
    const [chatData, setChatData] = useState([]);
    const [newChat, setnewChat] = useState({
        text: "",
        reply_to: null,
    });
    const [repliedText, setRepliedText] = useState("");

    const handleCreateChat = async () => {
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
        axiosClient
            .post(`likechats`, {
                chat_id: id,
            })
            .then(async ({ data }) => {
                console.log(data);

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

    useEffect(() => {
        setnewChat({
            text: "",
            reply_to: null,
        });
        // Fetch data initially
        fetchData();

        // // Fetch data every 5 seconds
        // const intervalId = setInterval(fetchData, 5000);

        // // Clean up the interval on component unmount
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, [chatRoomId]);

    return (
        <main className="chats">
            <div className="chat-header">
                {messagingTo.image && (
                    <img
                        className="user-image"
                        src={
                            "http://127.0.0.1:8000/api/images/" +
                            messagingTo.image
                        }
                        width={40}
                        height={40}
                        alt="Other User"
                    />
                )}
                <h2 className="user-name">{messagingTo.name}</h2>
            </div>
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
                            {chat.sender_id !== currentUser.id && (
                                <img
                                    className="user-image"
                                    src={
                                        "http://127.0.0.1:8000/api/images/" +
                                        messagingTo.image
                                    }
                                    width={30}
                                    height={30}
                                    alt="Other User"
                                />
                            )}
                            <div className="each-chat">
                                <p className="message-text">{chat.text}</p>
                            </div>
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
                                        isLikedByCurrentUser ? "red" : "black"
                                    }
                                    onClick={() => {
                                        handleLikeChat(chat.chat_id);
                                    }}
                                />
                                <MdReply
                                    size={30}
                                    color={
                                        newChat.reply_to == chat.chat_id
                                            ? "red"
                                            : "black"
                                    }
                                    onClick={() => {
                                        setnewChat({
                                            ...newChat,
                                            reply_to: chat.chat_id,
                                        });

                                        for (
                                            let i = 0;
                                            i < chatData.length;
                                            i++
                                        ) {
                                            if (
                                                chatData[i].chat_id ==
                                                chat.chat_id
                                            ) {
                                                setRepliedText(
                                                    chatData[i].text
                                                );
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div
                className="chat-input"
                style={{
                    position: "relative",
                }}
            >
                {newChat.reply_to && (
                    <p
                        style={{
                            position: "absolute",
                            left: 20,
                            top: -30,
                        }}
                    >
                        reply to {repliedText}
                    </p>
                )}
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="input-type-message"
                    value={newChat.text}
                    onChange={(ev) => {
                        setnewChat({ ...newChat, text: ev.target.value });
                    }}
                />
                <button className="btn btn-primary" onClick={handleCreateChat}>
                    Send
                </button>
            </div>
        </main>
    );
};

export default Chats;
