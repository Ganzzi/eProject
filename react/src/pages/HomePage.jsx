import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { BsChatRightText } from "react-icons/Bs";

export default function Homescreen() {
    const { user, token, setUser, setToken } = useStateContext();
    const [userDataFetched, setUserDataFetched] = useState(false);

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

    if (!token) {
        return <Navigate to={"/"} />;
    } else if (token && user.role_id == 1 && userDataFetched) {
        return <Navigate to={"/admin"} />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setToken(null);
            setUser({});
        });
    };

    return (
        <div id="homeLayout" className="container-fluid">
            <div
                className="py-3 text-black row sticky-top"
                style={{
                    height: "100px",
                    backgroundColor: "pink",
                }}
            >
                <div
                    className="col-2 d-flex justify-content-center"
                    style={{
                        fontFamily: "Papyrus",
                        fontSize: "30px",
                    }}
                >
                    <Link to={"/posts"}>spaceshare</Link>
                </div>

                <div className="col-6  d-flex justify-content-center">
                    <form
                        action=""
                        className="col-12"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >
                        <input
                            type="text"
                            id="search-text"
                            placeholder="search.."
                        />
                        <button
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                            }}
                            type="submit"
                        ></button>
                    </form>
                </div>

                <div
                    className="col-2 d-flex justify-content-end align-items-center"
                    style={{}}
                >
                    <Link to={"/messages"}>
                        <BsChatRightText size={30} color="black" />
                    </Link>
                </div>
                <div className="col-1 d-flex justify-content-end align-items-center">
                    <Link to={"/profile/" + user.id}>{user.name}</Link>
                </div>

                <div className="col-1 d-flex justify-content-end align-items-center">
                    <a
                        className="btn-logout btn btn-primary"
                        onClick={onLogout}
                    >
                        Logout
                    </a>
                </div>
            </div>

            {user.role_id != 1 && <Outlet />}
        </div>
    );
}
