import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

// import { BorderAll } from "@material-ui/icons";
import { HiOutlinePhotograph } from "react-icons/Hi";

// import { BorderAll } from "@material-ui/icons";


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { user, token, setUser, setToken } = useStateContext();
    console.log(user.id);

    useEffect(() => {
        axiosClient.get("/posts").then(({ data }) => {
            console.log(data);
            setPosts(data);
        });
    }, []);

    const handleLikePost = async (id) => {
        const x = {
            post_id: id
        }
        await axiosClient.post('/likeposts?', x).then(({ data }) => {
            console.log(data);
        })
        .catch(() => {
        });
    }

    const handleCreatePost = async () => {
        
    }

    return (
        <div style={{}} className="row">
            <div
                className="col-2 justify-content-center d-flex"
                style={{
                    backgroundColor: "aliceblue",
                    height: 5000,
                }}
            >
                <img
                    src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
                    alt=""
                    style={{
                        width: 40,
                        height: 40,
                    }}
                />
                <p>{user.name}</p>
            </div>

            <div className="col-7">
                <div
                    className=" posts "
                    style={{
                        display: "flex",
                        backgroundColor: "aliceblue",
                        borderRadius: "10px",
                        width: "none",
                    }}
                >
                    <form
                        className="col-12"
                        style={{
                            display: "flex",
                            flexDirection: "col",
                            alignItems: "flex-start",
                            marginBottom: "30px",
                        }}
                    >
                        <img
                            src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
                            alt=""
                            style={{
                                width: 40,
                                height: 40,
                            }}
                        />
                        <p>{user.name}</p>
                        <div>
                            <input type="text" style={{
                                display: "flex",
                                width: "100%",
                                padding: "10px",
                                fontSize: "20px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                resize: "none",
                            }}
                                placeholder="What's on your mind?"

                            />
                            <input type="file" />
                            <label for="file" ><HiOutlinePhotograph/></label>
                        </div>
                        <div>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "purple",
                                    color: "#fff",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                type="submit"
                                onClick={() => {
                                    handleCreatePost()
                                }}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col">
                    {posts.map((item, index) => (
                        <div className="col-12" style={{
                            border: 'solid thin black',
                            padding: 5,
                            margin: 5
                        }}>
                            <div>
                                <div className="d-flex">
                                    <img src={"http://127.0.0.1:8000/api/images/"+item.creator_image} width={50} height={50} alt=""/>
                                     <p >{item.creator_name}</p>
                                </div>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <img
                                    src={
                                        "http://127.0.0.1:8000/api/images/" +
                                        item.image
                                    } 
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                            <div className="d-flex" style={{
                                justifyContent: 'space-between'
                            }}>
                                <div>{item?.likes?.length} likes</div>
                                <div>{item?.comments?.length} comments</div>
                            </div>
                            <div>
                                {item?.comments.map((cmt) => (
                                    
                                    <div className="" style={{
                                        backgroundColor: 'gray',
                                        padding: '10px',
                                        width: ''
                                    }}>
                                        <p>{cmt.text}</p>
                                        <button onClick={async () => {
                                            await handleLikePost(item.id)
                                        }}
                                        >like</button>
                                        <p 
                                        
                                        style={{
                                            
                                           
                                        }}>{cmt.likes.length} likes</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-3 justify-content-center align-items-start d-flex row">
                <div className="col-12 row">
                    <div className="col-12">
                        <h2>Follower</h2>
                    </div>
                    <div className="col-12">
                        <h2>Following</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
