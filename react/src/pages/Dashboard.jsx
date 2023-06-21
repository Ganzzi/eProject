import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function dashboard() {

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

        <div id="dashboardLayout">
            <aside>
                <div style={{
                    fontFamily: "fantasy", fontSize: "30px", paddingLeft: "0px"
                }}>
                    <img src={
                        "http://127.0.0.1:8000/api/images/" +
                        user.image
                    } alt="" style={{ width: "80px", height: "80px" }} /> ADMIN
                </div>
                <div class="w3-row">
                    <div className="w3-col" style={{ width: "80%" }}>
                        <Link to={"/admin/users"}>user</Link></div>

                    <div className="w3-col" style={{ width: "80%" }}><Link to={"/admin/chatrooms"}>Chat</Link></div>
                    <div className="w3-col" style={{ width: "80%" }}><Link to={"/admin/posts"}>Posts</Link></div>
                </div>

            </aside>
            <div className="container">
                <div className="w3-col" style={{ width: "80%" }}>
                    <header>
                        <div> </div>
                        <div>
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
        </div>
    );
}
