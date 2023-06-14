import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

const receivedMessages = [
    { text: "Xin chào!", sender: "receiver" },
    { text: "Chào bạn!", sender: "receiver" },
    { text: "Bạn đang làm gì?", sender: "receiver" },
];

const Message = () => {
    const { user } = useStateContext();

    const [chatrooms, setChatrooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(0);

    useEffect(() => {
        getChatroom();
    }, []);

    const getChatroom = () => {
        axiosClient
            .get("/chatrooms")
            .then(({ data }) => {
                console.log(data);
                setChatrooms(data);
            })
            .catch(() => {});
    };

    return (
        <div className="main-content d-flex">
            {/* Sidebar */}
            <aside className="sidebar bg-light">
                <h2>Rooms</h2>
                <ul className="list-group">
                    {chatrooms.map((room, index) => (
                        <li
                            key={index}
                            className={`list-group-item ${
                                index === selectedRoom ? "active" : ""
                            }`}
                            onClick={() => {
                                setSelectedRoom(index);
                            }}
                        >
                            {room.participants.map((u, i) => {
                                if (user.id != u.paticipator_id) {
                                    return (
                                        <div className="d-flex justify-content-start flex-row items-center bg-gray">
                                            <div className="">
                                                <img
                                                    src={
                                                        "http://127.0.0.1:8000/api/images/" +
                                                        u.image
                                                    }
                                                    width={80}
                                                    height={80}
                                                    alt=""
                                                />
                                            </div>

                                            <div
                                                className="d-flex"
                                                style={{
                                                    flexDirection: "column",
                                                    flex: 1,
                                                    justifyContent: "start",
                                                    alignItems: "start",
                                                }}
                                            >
                                                <p>{u.name}</p>
                                                <p>
                                                    {
                                                        chatrooms[index]
                                                            .last_message.text
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chats */}
            <main className="chats">
                <div>
                    {/* {map((item, index) => (
                        <div>
                            <div>{item.text}</div>
                            <div>{index}</div>
                            <div>{item.sender}</div>
                        </div>
                    ))} */}
                </div>
            </main>
        </div>
    );
};

export default Message;
