import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { user, token } = useStateContext();

    if (token) {
        if (user.role_id == 1) {
            return <Navigate to={"/admin"} />;
        } else
        {
            return <Navigate to={"/posts"} />;
        }
    }
    return (
        <div>
            <Outlet />
        </div>
    );
}
