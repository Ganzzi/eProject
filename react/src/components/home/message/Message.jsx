import React from "react";

<<<<<<< HEAD
const Message = () =>
{
    return (
        <div
            className="d-flex flex-row"
            style={{
                backgroundColor: "red",
                width: "100%",
                flex: 1,
            }}
        >
            <div
                style={{
                    flex: 1,
                }}
            >
                chat rooms
            </div>
=======
const Message = () => {
    const roomCount = 24;
    const rooms = Array.from(
        { length: roomCount },
        (_, index) => `Room ${index}`
    );
>>>>>>> 9bc2eff412cc10ea55315305b2bd4e6f591397dc

    const selectedRoom = "Room 0";

    return (
        <div className="main-content d-flex">
            {/* Sidebar */}
            <aside className="sidebar bg-light">
                <h2>Rooms</h2>
                <ul className="list-group">
                    {rooms.map((room, index) => (
                        <li
                            key={index}
                            className={`list-group-item ${
                                room === selectedRoom ? "active" : ""
                            }`}
                        >
                            {room}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chats */}
            <main className="chats"></main>
        </div>
    );
};

export default Message;
