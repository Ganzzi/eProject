import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
// import { AiOutlineUser } from "react-icons/Ai";
// import { BsFillChatDotsFill } from "react-icons/Bs";
// import { BsFillFilePostFill } from "react-icons/Bs";
// import { AiOutlineLogout } from "react-icons/Ai";


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

        <div id="dashboardLayout" >
            <aside>
                <div style={{
                    fontFamily: "fantasy", fontSize: "30px", paddingLeft: "0px"
                }}>
                    <img src={
                        "http://127.0.0.1:8000/api/images/" +
                        user.image
                    } alt="" style={{ width: "80px", height: "80px" }} /> ADMIN
                </div>
<div></div>
<br />
                <div class="w3-row">
                    
                    <div className="w3-col" style={{ width: "100%" 
                ,border:"solid thin black",borderRadius:"3rem"
                }}>
                   
                        <Link to={"/admin/users"}> <AiOutlineUser size={30} color="black" /> user</Link></div>
<br />
                    <div className="w3-col"  style={{ width: "100%" 
                ,border:"solid thin black",borderRadius:"3rem"
                }}><Link to={"/admin/chatrooms"}><BsFillChatDotsFill size={30} color="black"/>Chat</Link></div>
                <br />
                    <div className="w3-col"  style={{ width: "100%" 
                ,border:"solid thin black",borderRadius:"3rem"
                }}><Link to={"/admin/posts"}><BsFillFilePostFill size={30} color="black"/>Posts</Link></div>
                </div>

            </aside>
            <div className="container" style={{}}>
               <div id="head">
               <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
               <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
               <svg className="bi me-2" width="80" height="32"><use xlink:href="#bootstrap"/></svg>
        <span className="fs-2" style={{
                        fontFamily:"fantasy",
                       
                        fontWeight: "bold",
                       
                        paddingBottom:"10rem"
                        
                    }}>spaceshare</span>
      </a>
      <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link active" aria-current="page"  style={{
                                border: "solid thin black",
                                borderRadius: "30px",
                                padding: 10,
                            }}  onClick={onLogout}>
                       
                        
                            <AiOutlineLogout size={40} />
                        </a></li>
        </ul>
                      
                 
        </header>
                   
                    </div>
                    
                    <main id="father"


                    >{user.role_id == 1 && <Outlet />}</main>
                    {notification && (
                        <div className="notification">{notification}</div>
                    )}
                </div>
            </div>
            


    );
}

