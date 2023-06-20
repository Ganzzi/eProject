import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

// import { BorderAll } from "@material-ui/icons";
import { HiOutlinePhotograph } from "react-icons/Hi";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../../utils";


// import { BorderAll } from "@material-ui/icons";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [follows, setfollows] = useState({
        followers: [],
        followings: [],
    });
    const { user, token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const [postForm, setPostForm] = useState({
        image: null,
    });

    const [description, setdescription] = useState(null);

    const getPostData = async () => {
        await axiosClient.get("/posts").then(({ data }) => {
            setPosts(data);
        });
    };

    useEffect(() => {
        getPostData();

        axiosClient.get("/follows").then(({ data }) => {
            setfollows({
                followers: data?.followers,
                followings: data?.followings,
            });
        });
    }, []);

    const getPostDataFromChil = async () => {
        await getPostData();
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", postForm.image);
        formData.append("creator_id", user.id);
        formData.append("description", description);

        await axiosClient.post("/posts", formData).then(async ({ data }) => {
            // console.log(data);
            await getPostData();
        });
    };

    return (
        <div style={{}} className="row">
            <div
                className="col-2 justify-content-center d-flex card"
                style={{
                    display: "flex",
                    border: "solid thin black",
                    padding: 5,
                    margin: 5,
                    height: "fit-content",
                }}
            >
                <div>
                    <h3>Information</h3>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={"http://127.0.0.1:8000/api/images/"}
                            alt=""
                            style={{
                                width: 80,
                                height: 80,
                            }}
                        />
                    </div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Bio: {user.bio}</p>
                    <p>Gender: {user.gender}</p>
                    <p>Join Date: {formatDateTime(user.created_at)}</p>
                </div>
            </div>

            <div className="col-7">
                <div
                    style={{
                        display: "flex",
                        border: "solid thin gray",
                        padding: 5,
                        margin: 5,
                        borderRadius: "10px",
                        width: "none",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <img
                            src="http://127.0.0.1:8000/api/images/"
                            alt=""
                            style={{
                                width: 40,
                                height: 40,
                            }}
                        />
                        <p>{user.name}</p>
                    </div>
                    <form
                        className="col-9 d-flex"
                        style={{
                            display: "flex",
                            flexDirection: "col",
                            alignItems: "flex-start",
                            marginBottom: "30px",
                            padding:"10px",
                        }}
                        onSubmit={handleCreatePost}
                    >
                        <div className="d-flex col-12">
                            <input
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    padding: "0px",
                                    fontSize: "20px",
                                    border: "null",
                                    borderRadius: "4px",
                                    resize: "none",
                                }}
                                placeholder="What's on your mind?"
                                onChange={(ev) => {
                                    setdescription(ev.target.value);
                                }}
                            />

                            <input
                                type="file"
                                id="file"
                                onChange={(ev) =>
                                    setPostForm({
                                        ...postForm,
                                        image: ev.target.files[0],
                                    })
                                }
                            />
                            <label for="file">
                                <HiOutlinePhotograph width={100} 
                                height={1000}
                                size={40}
                                color="black"/>
                            </label>
                        </div>
                        <div>
                            <button
                                style={{
                                    padding: "25px",
                                    backgroundColor: "purple",
                                    color: "white",
                                    border: "3px",
                                    
                                }}
                                type="submit"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col">
                    {posts.map((post) => (
                        <PostCard
                            getPostData={getPostDataFromChil}
                            post={post}
                            post_creator={{
                                image: post.creator_image,
                                name: post.creator_name,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="col-3 justify-content-center align-items-start d-flex row">
                <div className="col-12 row">
                    <div className="col-12">
                        <h2>{follows?.followers?.length} Follower</h2>
                        {follows.followers &&
                            follows.followers.map((fl) => (
                                <div
                                    className="d-flex"
                                    onClick={() => {
                                        navigate(`/profile/${fl.id}`);
                                    }}
                                >
                                    <img
                                        src={
                                            "http://127.0.0.1:8000/api/images/" +
                                            fl.image
                                        }
                                        alt="Creator Image"
                                        className="rounded-circle"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                    <p>{fl.name}</p>
                                </div>
                            ))}
                    </div>
                    <div className="col-12">
                        <h2>{follows?.followings?.length} Following</h2>
                        {follows.followings &&
                            follows.followings.map((fl) => (
                                <div
                                    className="d-flex"
                                    onClick={() => {
                                        navigate(`/profile/${fl.id}`);
                                    }}
                                >
                                    <img
                                        src={
                                            "http://127.0.0.1:8000/api/images/" +
                                            fl.image
                                        }
                                        alt="Creator Image"
                                        className="rounded-circle"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                    <p>{fl.name}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
