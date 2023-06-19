import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Dashboard() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const [userDataFetched, setUserDataFetched] = useState(false);

    useEffect(() => {
        if (token) {
            axiosClient.get("/user").then(({ data }) => {
                setUser(data);
                setUserDataFetched(true);
            });
        }
    }, [token]);

    if (!token) {
        return <Navigate to={"/"} />;
    } else if (token && user.role_id != 1 && userDataFetched) {
        return <Navigate to={"/posts"} />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setToken(null);
            setUser({});
        });
    };

    return (
        <div id="dashboardLayout" className="row">
            <aside className="col-2">
                <Link to={"/admin/users"}>user</Link>{" "}
                <Link to={"/admin/chatrooms"}>Chat</Link>
                <Link to={"/admin/posts"}>Posts</Link>
            </aside>
            <div className="content col-10">
                <header>
                    <div>header</div>
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
                </header>
                <main>{user.role_id == 1 && <Outlet />}</main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
