import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Homescreen() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to={"/"} />;
    }

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            console.log(data);
            setUser(data);
        });
    }, []);

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div
            id="homeLayout"
            className="d-flex flex-1 flex-col"
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                className="d-flex w-full flex-col justify-between"
                style={{
                    justifyContent: "space-between",
                }}
            >
                <div>spaceshare</div>
                <div>
                    {user.name}
                    <a
                        href="#"
                        className="btn-logout btn btn-primary"
                        onClick={onLogout}
                    >
                        Logout
                    </a>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
