import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Chats from "./Chats";

const Message = () => {
    const { user } = useStateContext();
    const location = useLocation();
    const navigate = useNavigate();

    const [chatrooms, setChatrooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(-1);
    const [messagingTo, setMessagingTo] = useState({
        name: "",
        id: location.state?.id,
        image: "",
    });
    const [chatRoomId, setChatRoomId] = useState(null);
    const [isMessageExisted, setIsMessageExisted] = useState(false);

    useEffect(() => {
        getChatroom();
    }, []);

    const getChatroom = () => {
        axiosClient
            .get("/chatrooms")
            .then(({ data }) => {
                // console.log(data);
                let _selectedRoom = -1;

                outerLoop: for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].participants.length; j++) {
                        // console.log(i);
                        if (
                            data[i].participants[j].paticipator_id ==
                            location.state?.id
                        ) {
                            _selectedRoom = i;
                            setSelectedRoom(i);
                            break outerLoop;
                        }
                    }
                }

                // The code will continue from here after breaking out of the loops

                setChatrooms(data);
                setChatRoomId(data[_selectedRoom].id);
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
                                for (
                                    let i = 0;
                                    i < room.participants.length;
                                    i++
                                ) {
                                    if (
                                        room.participants[i].paticipator_id !=
                                        user.id
                                    ) {
                                        setMessagingTo({
                                            id: room.participants[i]
                                                .paticipator_id,
                                            image: room.participants[i].image,
                                            name: room.participants[i].name,
                                        });
                                        break;
                                    }
                                }
                                setSelectedRoom(index);
                                setChatRoomId(room.id);
                            }}
                        >
                            {room?.participants.map((participant, i) => {
                                if (user.id != participant.paticipator_id) {
                                    return (
                                        <div
                                            className="d-flex justify-content-start flex-row items-center bg-gray"
                                            key={i}
                                        >
                                            <div className="">
                                                <img
                                                    src={
                                                        "http://127.0.0.1:8000/api/images/" +
                                                        participant.image
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
                                                <p>{participant.name}</p>
                                                <p>
                                                    {room?.last_message?.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Add this to handle the missing return statement warning
                            })}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chats */}
            <Chats
                messagingTo={messagingTo}
                chatRoomId={chatRoomId}
                currentUser={user}
            />
        </div>
    );
};

export default Message;
