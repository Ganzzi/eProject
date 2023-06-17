import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useLocation } from "react-router-dom";

const receivedMessages = [
    { text: "Xin chào!", sender: "receiver" },
    { text: "Chào bạn!", sender: "receiver" },
    { text: "Bạn đang làm gì?", sender: "receiver" },
];

const Message = () => {
    const { user } = useStateContext();
    const location = useLocation();

    const [chatrooms, setChatrooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [messagingTo, setMessagingTo] = useState(location.state?.id);

    useEffect(() => {
        getChatroom();
        console.log(messagingTo);
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

    //     return (
    //         <div className="main-content d-flex">
    //             {/* Sidebar */}
    //             <aside className="sidebar bg-light">
    //                 <h2>Rooms</h2>
    //                 <ul className="list-group">
    //                     {chatrooms.map((room, index) => (
    //                         <li
    //                             key={index}
    //                             className={`list-group-item ${index === selectedRoom ? "active" : ""
    //                                 }`}
    //                             onClick={() =>
    //                             {
    //                                 setSelectedRoom(index);
    //                             }}
    //                         >
    //                             {room.participants.map((participant, i) =>
    //                             {
    //                                 if (user.id != participant.paticipator_id)
    //                                 {
    //                                     return (
    //                                         <div className="d-flex justify-content-start flex-row items-center bg-gray">
    //                                             <div className="">
    //                                                 <img
    //                                                     src={
    //                                                         "http://127.0.0.1:8000/api/images/" +
    //                                                         u.image
    //                                                     }
    //                                                     width={80}
    //                                                     height={80}
    //                                                     alt=""
    //                                                 />
    //                                             </div>

    //                                             <div
    //                                                 className="d-flex"
    //                                                 style={{
    //                                                     flexDirection: "column",
    //                                                     flex: 1,
    //                                                     justifyContent: "start",
    //                                                     alignItems: "start",
    //                                                 }}
    //                                             >
    //                                                 <p>{u.name}</p>
    //                                                 <p>
    //                                                     {
    //                                                         chatrooms[index]
    //                                                             .last_message.text
    //                                                     }
    //                                                 </p>
    //                                             </div>
    //                                         </div>
    //                                     );
    //                                 }
    //                             })}
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </aside>

    //             {/* Chats */}
    //             <main className="chats">
    //                 <div>
    //                     {/* {map((item, index) => (
    //                         <div>
    //                             <div>{item.text}</div>
    //                             <div>{index}</div>
    //                             <div>{item.sender}</div>
    //                         </div>
    //                     ))} */}
    //                 </div>
    //             </main>
    //         </div>
    //     );
    // };

    // export default Message;

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
                            {/* {room?.participants.map((participant, i) =>
                            {
                                if (user.id == participant.paticipator_id)
                                {
                                    return (
                                        <div
                                            className="d-flex justify-content-start flex-row items-center bg-gray"
                                            key={i}
                                        >
                                            <div className="">
                                                <img
                                                    src={"http://127.0.0.1:8000/api/images/" + participant.image}
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
                                                    {room?.chats.length > 0 ? room?.chats[room?.chats.length - 1].text : ''}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Add this to handle the missing return statement warning
                            })} */}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chats */}
            <main className="chats">
                <div>
                    {/* {chatrooms[selectedRoom]?.chats.map((chat, index) => (
                        <div key={index}>
                            <div>{chat.text}</div>
                            <div>{index}</div>
                            <div>{chat.sender_id}</div>
                            <div>{chat.likes.length} Likes</div>
                        </div>
                    ))} */}
                </div>
            </main>
        </div>
    );
};

export default Message;
