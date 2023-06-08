import React from "react";

const Message = () => {
    const roomCount = 24;
    const rooms = Array.from(
        { length: roomCount },
        (_, index) => `Room ${index}`
    );

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
