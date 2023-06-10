import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";



export default function Homescreen() {

    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to={"/"} />;
    }

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            // console.log(data);
            setUser(data);
        });
    }, []);

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    }; return (
        <div id="homeLayout" className="container-fluid" style={{ backgroundColor: "lightblue" }}>
            <div
                className="py-3 text-black row sticky-top"
                style={{
                    height: "9vh",
                    backgroundColor: "pink",
                }}
            >
                <div className="col-2 d-flex justify-content-center"

                    style={{
                        fontFamily: "Papyrus",
                        fontSize: "30px",
                    }
                    }>
                    <Link to={"/posts"}>spaceshare</Link>


                </div>

                <div className="col-6  d-flex justify-content-center">
                    <form action="" id="search-box">
                        <input type="text" id="search-text" placeholder="search.." />
                        
                    </form>
                </div>

                <div className="col-4 d-flex justify-content-end align-items-center">
                    <Link to={"/messages"}>tin nhan</Link>
                    <Link to={"/profile"}>{user.name}</Link>
                    <a
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
