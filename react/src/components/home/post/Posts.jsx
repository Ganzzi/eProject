import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePhotograph } from "react-icons/Hi";

import { useStateContext } from "../../../contexts/ContextProvider";
import PostCard from "./PostCard";
import axiosClient from "../../../axios-client";
import { formatDateTime } from "../../../utils";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [follows, setfollows] = useState({
        followers: [],
        followings: [],
    });
    const { user, setAlerts } = useStateContext();
    const navigate = useNavigate();
    const [postForm, setPostForm] = useState({
        image: null,
    });
    const [description, setdescription] = useState(null);

    const getPostData = async () => {
        await axiosClient.get("/posts").then(({ data }) => {
            setPosts(data.reverse());
        });
    };

    useEffect(() => {
        getPostData();
    }, []);

    useEffect(() => {
        if (user.id) {
            const getFollows = async () => {
                await axiosClient
                    .get(`/follows/${user.id}`)
                    .then(({ data }) => {
                        setfollows({
                            followers: data?.followers,
                            followings: data?.followings,
                        });
                    });
            };

            getFollows();
        }
    }, [user.id]);

    const getPostDataFromChil = async () => {
        await getPostData();
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", postForm.image);
        formData.append("creator_id", user.id);
        formData.append("description", description);

        await axiosClient
            .post("/posts", formData)
            .then(async ({ data }) => {
                setPostForm({
                    image: null,
                });
                setdescription("");

                setAlerts({
                    type: "info",
                    message: "post was successfully created",
                    time: new Date(),
                });

                await getPostData();

                // await axiosClient
                //     .post("/posts", formData)
                //     .then(async ({ data }) => {
                //         // console.log(data);
                //     });
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status === 422) {
                    setAlerts({
                        type: "error",
                        message: response.data.message,
                        time: new Date(),
                    });
                }
            });
    };

    return (
        <div style={{}} className="row">
            <div
                className="col-md-3 justify-content-center d-none d-md-flex card"
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
                            src={
                                `${import.meta.env.VITE_BASE_URL}/api/images/` +
                                user.image
                            }
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
                    <div className=" d-xl-none">
                        <div className="">
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
                                                `${
                                                    import.meta.env
                                                        .VITE_BASE_URL
                                                }/api/images/` + fl.image
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
                        <div className="">
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
                                                `${
                                                    import.meta.env
                                                        .VITE_BASE_URL
                                                }/api/images/` + fl.image
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

            <div className="col-12 col-md-8 col-xl-7">
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
                            src={
                                `${import.meta.env.VITE_BASE_URL}/api/images/` +
                                user.image
                            }
                            alt=""
                            style={{
                                width: 40,
                                height: 40,
                            }}
                        />
                        <p>{user.name}</p>
                    </div>
                    <form
                        className="col-12 d-flex flex-column align-items-center"
                        onSubmit={handleCreatePost}
                    >
                        <div className="d-flex col-9">
                            <input
                                value={description}
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
                                style={{
                                    display: "none",
                                    height: 0,
                                    overflow: "hidden",
                                    width: 0,
                                }}
                            />
                            <label htmlFor="file">
                                <HiOutlinePhotograph
                                    width={100}
                                    height={1000}
                                    size={40}
                                    color="black"
                                    onChange={(ev) => {
                                        setPosts({
                                            ...posts,
                                            image: ev.target.files[0],
                                        });
                                    }}
                                />
                            </label>
                        </div>
                        <div>
                            {postForm.image && (
                                <>
                                    <img
                                        src={URL.createObjectURL(
                                            postForm.image
                                        )}
                                        alt=""
                                        width={400}
                                        height={400}
                                    />
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            setPostForm({
                                                image: null,
                                            })
                                        }
                                    >
                                        remove
                                    </button>
                                </>
                            )}
                        </div>
                        {description && postForm.image && (
                            <div className="d-flex my-2">
                                <button
                                    style={{
                                        padding: "25px",
                                        backgroundColor: "pink",
                                        color: "black",
                                        border: "3px",
                                    }}
                                    type="submit"
                                >
                                    Post
                                </button>
                            </div>
                        )}
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

            <div className="col-xl-2 justify-content-center align-items-start d-none d-xl-flex row">
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
                                            `${
                                                import.meta.env.VITE_BASE_URL
                                            }/api/images/` + fl.image
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
                                            `${
                                                import.meta.env.VITE_BASE_URL
                                            }/api/images/` + fl.image
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
