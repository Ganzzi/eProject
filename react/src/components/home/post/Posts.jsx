import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import { BorderAll } from "@material-ui/icons";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { user, token, setUser, setToken } = useStateContext();
    const [postText, setPostText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleTextChange = (event) => {
        setPostText(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePostSubmit = (event) => {
        event.preventDefault();
        if (postText.trim() !== "") {
            // Thực hiện xử lý post bài viết tại đây
            console.log("Post Text:", postText);
            console.log("Selected File:", selectedFile);
            // Gửi dữ liệu postText và selectedFile đến server để xử lý
            // Ví dụ: fetch('/post', { method: 'POST', body: formData })
            //   .then(response => response.json())
            //   .then(data => console.log(data))
            //   .catch(error => console.error(error));

            setPostText("");
            setSelectedFile(null);
        }
    };

    console.log();

    useEffect(() => {
        axiosClient.get("/posts").then(({ data }) => {
            console.log(data);
            setPosts(data);
        });
    }, []);
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
                    className="posts"
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
                        <textarea
                            style={{
                                display: "flex",
                                width: "100%",
                                height: "100px",
                                padding: "10px",
                                fontSize: "20px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                resize: "none",
                            }}
                            placeholder="What's on your mind?"
                            value={postText}
                        />
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
                    </form>
                </div>
                <div className="col">
                    {posts.map((item, index) => (
                        <div className="col-12">
                            <div>
                                {/* <img src={item.image} alt="" /> */}
                                <h1>{item.creator_id}</h1>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <img
                                    src={item.image}
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                            <br />
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
