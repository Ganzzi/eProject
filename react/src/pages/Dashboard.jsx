import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Dashboard() {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to={"/"} />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
      
        <div id="dashboardLayout">
          
           
          
            <aside>
               <div style={{fontFamily:"fantasy",fontSize:"30px",paddingLeft:"0px"
}}>
            <img src="https://cdn2.iconfinder.com/data/icons/colored-simple-circle-volume-01/128/circle-flat-general-51851bd79-1024.png" alt="" style={{width:"80px",height:"80px"}} /> ADMIN
            </div>
          
         
                <Link to={"/admin/users"}>user</Link> <Link to={"/admin/chatrooms"}>Chat</Link>
                <Link to={"/admin/posts"}>Posts</Link>
            </aside>
            <div className="content">
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
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
