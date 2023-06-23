import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, Link } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { BsChatRightText, BsFillBellFill } from "react-icons/Bs";
import {
    AiOutlineClose,
    AiOutlineLogout,
    AiOutlineMenu,
    AiOutlineSearch,
} from "react-icons/ai";

import { formatDateTime } from "../utils";

export default function Homescreen() {
    const {
        user,
        token,
        setUser,
        setToken,
        notifications,
        setNotifications,
        alerts,
        setAlerts,
    } = useStateContext();
    const [userDataFetched, setUserDataFetched] = useState(false);
    const [showNotification, setshowNotification] = useState(false);
    const [newNotifNumber, setNewNotifNumber] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
        setshowNotification(false);
    };

    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setShowAlert(true);
        const timer = setTimeout(() => {
            setShowAlert(false);
            setAlerts({
                type: null,
                message: null,
                time: null,
            });
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [alerts]);

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        if (token) {
            axiosClient
                .get("/user")
                .then(({ data }) => {
                    setUser(data);
                    setUserDataFetched(true);
                })
                .catch((err) => {
                    const response = err.response;

                    if (response && response.status === 401) {
                        console.error(response.status); // Access the status code
                        console.error(response.data.message);
                        localStorage.removeItem("ACCESS_TOKEN");
                    }
                });
        }
    }, [token, setUser]);

    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = async () => {
        await axiosClient.get("/notifications").then(({ data }) => {
            let count = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i]?.state == "unread") {
                    count++;
                }
            }
            setNewNotifNumber(count);
            setNotifications(data);
        });
    };

    const handleSeeNotificatitons = async () => {
        await axiosClient
            .post("/update-notification-state")
            .then(async ({ data }) => {
                await getNotifications();
            });
    };

    if (!token) {
        return <Navigate to={"/"} />;
    } else if (token && user.role_id == 1 && userDataFetched) {
        return <Navigate to={"/admin"} />;
    }

    const onLogout = async (ev) => {
        ev.preventDefault();

        await axiosClient
            .post("/logout")
            .then(() => {
                setToken(null);
                setUser({});
            })
            .catch((err) => {
                console.log(err);
                setToken(null);
                setUser({});
            });
    };

    return (
        <div id="homeLayout" className="container-fluid">
            {/* Home Page Header */}
            <div
                className="py-3 d-flex text-black sticky-top justify-content-center justify-content-sm-between"
                style={{
                    height: "100px",
                    backgroundColor: "pink",
                }}
            >
                {/* SpaceShare */}
                <div
                    className="d-sm-flex d-none justify-content-center"
                    style={{
                        fontFamily: "Arial",
                        fontSize: "35px",
                        fontWeight: "bold",
                        marginLeft: "2.5rem",
                    }}
                >
                    <Link
                        to={"/posts"}
                        style={{
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        spaceshare
                    </Link>
                </div>

                {/* Search */}
                <div className="d-flex justify-content-center">
                    <form
                        action=""
                        className="col-12"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="text"
                            id="search-text"
                            placeholder="search.."
                        />
                        <AiOutlineSearch
                            size={50}
                            className="btn btn-outline-primary"
                            style={{
                                borderRadius: 50,
                            }}
                            onClick={() => {}}
                        />
                    </form>
                </div>

                {/* Menu in large screen **/}
                <div className="d-lg-flex d-none ">
                    <div
                        className="d-flex justify-content-end align-items-center"
                        style={{
                            marginLeft: "2.5rem",
                        }}
                    >
                        <div
                            style={{
                                border: "solid thin black",
                                borderRadius: "30px",
                                padding: 10,
                            }}
                        >
                            <BsFillBellFill
                                size={40}
                                color={showNotification ? "blue" : "black"}
                                onClick={() => {
                                    setAlerts({
                                        type: "warming",
                                        message: "alerting",
                                        time: new Date(),
                                    });

                                    if (showNotification) {
                                        handleSeeNotificatitons();
                                    }
                                    setshowNotification(!showNotification);
                                }}
                            />
                            <p
                                style={{
                                    position: "absolute",
                                    top: 23,
                                    right: 253,
                                    fontSize: "1.2rem",
                                }}
                            >
                                {newNotifNumber != 0 && newNotifNumber}
                            </p>
                        </div>
                    </div>

                    <div
                        className=" d-flex justify-content-end align-items-center"
                        style={{
                            marginLeft: "0.5rem",
                        }}
                    >
                        <div
                            style={{
                                border: "solid thin black",
                                borderRadius: "30px",
                                padding: 10,
                            }}
                        >
                            <Link to={"/messages"}>
                                <BsChatRightText size={40} color="black" />
                            </Link>
                        </div>
                    </div>

                    <div
                        className="d-flex justify-content-end align-items-center"
                        style={{
                            marginLeft: "0.5rem",
                        }}
                    >
                        <div
                            style={{
                                border: "solid thin black",
                                borderRadius: "30px",
                                padding: 3,
                            }}
                        >
                            <Link to={"/profile/" + user.id}>
                                <img
                                    src={
                                        "http://127.0.0.1:8000/api/images/" +
                                        user.image
                                    }
                                    alt=""
                                    style={{
                                        width: 55,
                                        height: 55,
                                        borderRadius: "50%",
                                    }}
                                />
                            </Link>
                        </div>
                    </div>

                    <div
                        className=" d-flex justify-content-end align-items-center"
                        style={{
                            marginLeft: "0.5rem",
                        }}
                    >
                        <div
                            style={{
                                border: "solid thin black",
                                borderRadius: "30px",
                                padding: 10,
                            }}
                            onClick={onLogout}
                        >
                            <AiOutlineLogout size={40} />
                        </div>
                    </div>
                </div>

                {/* Menu Toggle */}
                <div
                    className="d-lg-none d-flex justify-content-center align-items-center"
                    onClick={handleMenuClick}
                    style={{
                        marginRight: "0.5rem",
                    }}
                >
                    {showMenu ? (
                        <AiOutlineClose size={40} />
                    ) : (
                        <AiOutlineMenu size={40} />
                    )}
                </div>

                {/* Menu in small screen */}
                {showMenu && (
                    <div
                        className="d-lg-none"
                        style={{
                            position: "absolute",
                            right: 50,
                            top: 10,
                            padding: 10,
                            border: "solid thin black",
                            borderRadius: 30,
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                backgroundColor: "#fff",
                                borderRadius: 30,
                                top: 0,
                                right: 0,
                                zIndex: -1,
                                width: "100%",
                                height: "100%",
                                opacity: 0.8,
                            }}
                        />

                        <div className="d-flex">
                            <div className="d-flex justify-content-end align-items-center">
                                <div
                                    style={{
                                        border: "solid thin black",
                                        borderRadius: "30px",
                                        padding: 10,
                                    }}
                                >
                                    <BsFillBellFill
                                        size={40}
                                        color={
                                            showNotification ? "blue" : "black"
                                        }
                                        onClick={() => {
                                            if (showNotification) {
                                                handleSeeNotificatitons();
                                            }
                                            setshowNotification(
                                                !showNotification
                                            );
                                        }}
                                    />
                                    <p
                                        style={{
                                            position: "absolute",
                                            top: 12,
                                            left: 17,
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        {newNotifNumber != 0 && newNotifNumber}
                                    </p>
                                </div>
                            </div>

                            <div
                                className=" d-flex justify-content-end align-items-center"
                                style={{
                                    marginLeft: "0.5rem",
                                }}
                            >
                                <div
                                    style={{
                                        border: "solid thin black",
                                        borderRadius: "30px",
                                        padding: 10,
                                    }}
                                >
                                    <Link to={"/messages"}>
                                        <BsChatRightText
                                            size={40}
                                            color="black"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div
                                className="d-flex justify-content-end align-items-center"
                                style={{
                                    marginLeft: "0.5rem",
                                }}
                            >
                                <div
                                    style={{
                                        border: "solid thin black",
                                        borderRadius: "30px",
                                        padding: 3,
                                    }}
                                >
                                    <Link to={"/profile/" + user.id}>
                                        <img
                                            src={
                                                "http://127.0.0.1:8000/api/images/" +
                                                user.image
                                            }
                                            alt=""
                                            style={{
                                                width: 55,
                                                height: 55,
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div
                                className=" d-flex justify-content-end align-items-center"
                                style={{
                                    marginLeft: "0.5rem",
                                }}
                            >
                                <div
                                    style={{
                                        border: "solid thin black",
                                        borderRadius: "30px",
                                        padding: 10,
                                    }}
                                    onClick={onLogout}
                                >
                                    <AiOutlineLogout size={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications */}
                {showNotification && (
                    <div
                        style={{
                            position: "absolute",
                            width: 400,
                            maxHeight: 600,
                            zIndex: 10,
                            right: 10,
                            top: 100,
                            overflow: "auto",
                            border: "solid thin black",
                        }}
                    >
                        {notifications.map((notif, index) => {
                            return (
                                <div
                                    style={{
                                        backgroundColor: `${
                                            notif?.state == "unread"
                                                ? "#9FB6CD"
                                                : "#CFCFCF"
                                        }`,
                                        padding: 7,
                                        borderRadius: 10,
                                        margin: 4,
                                    }}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <p
                                        style={{
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        {notif.text}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "start",
                                            alignItems: "end",
                                        }}
                                    >
                                        <p>{notif.type}</p>
                                        <p
                                            style={{
                                                fontSize: "0.7rem",
                                            }}
                                        >
                                            {formatDateTime(notif.updated_at)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Children Component */}
            {user.role_id != 1 && <Outlet />}

            {/* Alert */}
            {showAlert && alerts.type && (
                <div
                    className="alert-home"
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
    );
}
