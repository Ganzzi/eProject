import React from "react";

const Message = () => {
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

            <div>1 chat room</div>
        </div>
    );
};

export default Message;
