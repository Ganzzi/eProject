import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

// import { BorderAll } from "@material-ui/icons";
import { HiOutlinePhotograph } from "react-icons/Hi";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

// import { BorderAll } from "@material-ui/icons";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [follows, setfollows] = useState({
        followers: [],
        followings: []
    })
    const { user, token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const [postForm, setPostForm] = useState({
        image: null,
    })

    console.log(user.id);

    const [description, setdescription] = useState(null)

    const getPostData = async () => {
        await axiosClient.get("/posts").then(({ data }) => {
            setPosts(data);
        });
    }

    useEffect(() => {
        getPostData();

        axiosClient.get("/follows").then(({ data }) => {
            setfollows({
                followers: data?.followers,
                followings: data?.followings,
            });
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

    const handleCreatePost = async (e) => {
        e.preventDefault();

        console.log(postForm);

        const formData = new FormData();
        formData.append('image', postForm.image)
        formData.append('creator_id', user.id)
        formData.append('description', description)

        await axiosClient.post('/posts', formData).then(async ({data}) => {
            // console.log(data);
            await getPostData();
        });
    }

    return (
        <div style={{}} className="row">
            <div
                className="col-2 justify-content-center d-flex"
                style={{
                    display: "flex",
                    border: 'solid thin black',
                    padding: 5,
                    margin: 5,
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

                    style={{
                        display: "flex",
                        border: 'solid thin black',
                        padding: 5,
                        margin: 5,
                        backgroundColor: "aliceblue",
                        borderRadius: "10px",
                        width: "none",
                        flexDirection: 'column'
                    }}
                >
                    <div style={{
                        display: 'flex'
                    }}>
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
                    <form
                        className="col-9 d-flex"
                        style={{
                            display: "flex",
                            flexDirection: "col",
                            alignItems: "flex-start",
                            marginBottom: "30px",
                        }}
                        onSubmit={handleCreatePost}
                    >
                        
                        <div className="d-flex col-12">
                            <input 
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    padding: "10px",
                                    fontSize: "20px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    resize: "none",
                                }}
                                placeholder="What's on your mind?"
                                onChange={(ev) =>{
                                    setdescription(ev.target.value);
                                    console.log(description);
                                }}
                            />
                           
                            <input type="file" id="file" 
                                onChange={(ev) => setPostForm({...postForm, image: ev.target.files[0]}) }
                            />
                            <label for="file" ><HiOutlinePhotograph size={40}/></label>
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
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col">
                    {
                        posts.map((post) => (
                            <PostCard
                                post={post}
                                user={{
                                    image: post.creator_image,
                                    name: post.creator_name,
                                }}
                            />))
                    }
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
