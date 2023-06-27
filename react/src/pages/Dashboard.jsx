import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { BiUser, BiLogOut } from "react-icons/Bi";
import { BsFillChatDotsFill, BsFillFilePostFill } from "react-icons/Bs";

export default function dashboard() {
    const { user, token, setUser, setToken, alerts, showAlert } =
        useStateContext();
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
                <div
                    style={{
                        fontFamily: "fantasy",
                        fontSize: "30px",
                        paddingLeft: "0px",
                    }}
                >
                    {user?.image && (
                        <img
                            src={
                                `${import.meta.env.VITE_BASE_URL}/api/images/` +
                                user.image
                            }
                            alt=""
                            style={{ width: "80px", height: "80px" }}
                        />
                    )}
                    ADMIN
                </div>
                <div></div>
                <br />
                {
                    <div class="w3-row">
                        <div
                            className="w3-col"
                            style={{
                                width: "100%",
                                border: "solid thin black",
                                borderRadius: "3rem",
                            }}
                        >
                            <Link to={"/admin/users"}>
                                {" "}
                                <BiUser size={30} color="black" /> Users
                            </Link>
                        </div>
                        <br />
                        <div
                            className="w3-col"
                            style={{
                                width: "100%",
                                border: "solid thin black",
                                borderRadius: "3rem",
                            }}
                        >
                            <Link to={"/admin/chatrooms"}>
                                <BsFillChatDotsFill size={30} color="black" />
                                Chat Rooms
                            </Link>
                        </div>
                        <br />
                        <div
                            className="w3-col"
                            style={{
                                width: "100%",
                                border: "solid thin black",
                                borderRadius: "3rem",
                            }}
                        >
                            <Link to={"/admin/posts"}>
                                <BsFillFilePostFill size={30} color="black" />
                                Posts
                            </Link>
                        </div>
                    </div>
                }
            </aside>
            <div className="container" style={{}}>
                <div id="head">
                    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <svg className="bi me-2" width="80" height="32">
                                <use xlinkHref="#bootstrap" />
                            </svg>
                            <span
                                className="fs-2"
                                style={{
                                    fontFamily: "fantasy",

                                    fontWeight: "bold",

                                    paddingBottom: "10rem",
                                }}
                            >
                                spaceshare
                            </span>
                        </a>
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link active"
                                    aria-current="page"
                                    style={{
                                        border: "solid thin black",
                                        borderRadius: "30px",
                                        padding: 10,
                                    }}
                                    onClick={onLogout}
                                >
                                    <BiLogOut size={40} />
                                </a>
                            </li>
                        </ul>
                    </header>
                </div>

                <main id="father">{user.role_id == 1 && <Outlet />}</main>

                {/* Alert */}
                {showAlert && alerts.type && (
                    <div
                        className="alert-admin"
                        style={{
                            backgroundColor: `${
                                alerts.type == "info"
                                    ? "#00ccff"
                                    : alerts.type == "warming"
                                    ? "#FFCC99"
                                    : alerts.type == "error" && "#CC0000"
                            }`,
                        }}
                    >
                        <div className="alert-content">
                            <p>{alerts.message}</p>
                            <p className="alert-time">
                                {formatDateTime(alerts.time)}
                            </p>
                        </div>
                        <button
                            className="alert-close-btn"
                            onClick={handleAlertClose}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
