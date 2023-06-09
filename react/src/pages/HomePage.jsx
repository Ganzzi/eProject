import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Homescreen ()
{
    const { user, token, setUser, setToken } = useStateContext();

    if (!token)
    {
        return <Navigate to={"/"} />;
    }

    useEffect(() =>
    {
        axiosClient.get("/user").then(({ data }) =>
        {
            // console.log(data);
            setUser(data);
        });
    }, []);

    const onLogout = (ev) =>
    {
        ev.preventDefault();

        axiosClient.post("/logout").then(() =>
        {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div id="homeLayout" className="container-fluid">
            <div
                className="py-3 text-black row"
                style={{
                    height: "9vh",
                }}
            >
                <div className="col-2 d-flex justify-content-center">
                    spaceshare
                </div>
                <div className="col-10 d-flex justify-content-end align-items-center">
                    <p>{user.name}</p>
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
