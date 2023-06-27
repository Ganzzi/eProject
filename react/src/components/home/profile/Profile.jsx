import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useStateContext } from "../../../contexts/ContextProvider";
import PostCard from "../post/PostCard";
import axiosClient from "../../../axios-client";
import UpdateProfileModal from "./UpdateProfileModal";
import ActivityLogModal from "./ActivityLogModal";
import { formatDateTime } from "../../../utils";

const Profile = () => {
    const { user, setUser, setAlerts } = useStateContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const [profileContent, setProfileContent] = useState({
        image: "",
        name: "",
        email: "",
        bio: "",
        gender: "",
        created_at: null,
        followers: [],
        followings: [],
    });

    const [isFollowing, setIsFollowing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [posts, setposts] = useState([]);

    useEffect(() => {
        const getProfileData = async () => {
            let _profileContent;
            if (id == user.id) {
                _profileContent = {
                    ...profileContent,
                    image: user.image,
                    bio: user.bio,
                    created_at: user.created_at,
                    email: user.email,
                    gender: user.gender,
                    name: user.name,
                };
                setProfileContent({
                    _profileContent,
                });
            } else {
                await axiosClient
                    .get(`/user-profile/${id}`)
                    .then(({ data }) => {
                        _profileContent = {
                            ...profileContent,
                            image: data.image,
                            bio: data.bio,
                            created_at: data.created_at,
                            email: data.email,
                            gender: data.gender,
                            name: data.name,
                        };
                        setProfileContent({
                            _profileContent,
                        });
                    });
            }

            await axiosClient.get(`/follows/${id}`).then(({ data }) => {
                _profileContent = {
                    ..._profileContent,
                    followers: data?.followers,
                    followings: data?.followings,
                };

                setProfileContent(_profileContent);

                for (let i = 0; i < data.followers.length; i++) {
                    if (data.followers[i].id == user.id) {
                        setIsFollowing(true);
                        break;
                    }
                }
            });

            await getPostData();
        };

        getProfileData();
    }, [id, user]);

    const getPostData = async () => {
        await axiosClient.get(`posts-profile/${id}`).then(({ data }) => {
            setposts(data?.reverse());
        });
    };

    const handleUpdateProfile = async (formData) => {
        try {
            console.log(formData);
            await axiosClient
                .post(`/update-profile/${id}`, formData)
                .then(async () => {
                    setShowModal(false);

                    setAlerts({
                        type: "info",
                        message: `updated succesfully`,
                        time: new Date(),
                    });

                    await axiosClient.get("/user").then(({ data }) => {
                        setUser(data);
                    });
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

            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFollowOrUnfollow = async () => {
        await axiosClient
            .post("/follows", {
                follower_id: user.id,
                following_id: id,
            })
            .then(async () => {
                setAlerts({
                    type: "info",
                    message: `${
                        isFollowing
                            ? "Unfollowed successfully"
                            : "Followed  successfully"
                    }`,
                    time: new Date(),
                });
                await axiosClient.get(`/follows/${id}`).then(({ data }) => {
                    setProfileContent({
                        ...profileContent,
                        followers: data?.followers,
                        followings: data?.followings,
                    });

                    let _isFollowing = false;
                    for (let i = 0; i < data.followers.length; i++) {
                        if (data.followers[i].id == user.id) {
                            _isFollowing = true;
                            break;
                        }
                    }
                    setIsFollowing(_isFollowing);
                });
            });
    };

    return (
        <div className="container">
            <div className="text-center mt-4">
                <img
                    src={
                        `${import.meta.env.VITE_BASE_URL}/api/images/` +
                        profileContent.image
                    }
                    alt="User Image"
                    className="rounded-circle"
                    width={400}
                    height={400}
                />
                <p
                    className=""
                    style={{
                        fontSize: 30,
                    }}
                >
                    {profileContent.name}
                </p>
            </div>
            {id == user.id ? (
                <div className="d-flex justify-content-center  mt-4">
                    <button
                        variant="dark"
                        className="mx-1 btn btn-outline-secondary"
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        Update Profile
                    </button>
                    <button
                        variant="dark"
                        className="mx-1 btn btn-outline-secondary"
                        onClick={() => {
                            setIsActivityModalOpen(true);
                        }}
                    >
                        Activity Log
                    </button>
                </div>
            ) : (
                <div className="d-flex justify-content-center  mt-4">
                    <button
                        variant="dark"
                        className="mx-1 btn btn-outline-secondary"
                        onClick={() => {
                            navigate(`/messages/`, {
                                state: {
                                    id: id,
                                    name: profileContent.name,
                                    image: profileContent.image,
                                },
                            });
                        }}
                    >
                        Message
                    </button>
                    <button
                        variant={`${isFollowing ? "danger" : "primary"}`}
                        className={`mx-1 btn ${
                            isFollowing
                                ? "btn-outline-danger"
                                : "btn-outline-primary"
                        }`}
                        onClick={handleFollowOrUnfollow}
                    >
                        {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                </div>
            )}
            <div className="row mt-4">
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-6 col-lg-12">
                            <h3>Information</h3>
                            <p>Name: {profileContent.name}</p>
                            <p>Email: {profileContent.email}</p>
                            <p>Bio: {profileContent.bio}</p>
                            <p>Gender: {profileContent.gender}</p>
                            <p>
                                Join Date:{" "}
                                {formatDateTime(profileContent.created_at)}
                            </p>
                        </div>

                        <div className="col-6 col-lg-12">
                            <h3>{profileContent.followers?.length} Follower</h3>
                            <div className="d-flex flex-column">
                                {profileContent.followers &&
                                    profileContent.followers.map((fl) => (
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
                            <h3>
                                {profileContent.followings?.length} Following
                            </h3>
                            <div className="d-flex flex-column">
                                {profileContent.followings &&
                                    profileContent.followings.map((fl) => (
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
                <div className="col-lg-8">
                    <h3>Posts</h3>
                    {posts &&
                        posts.map((post) => (
                            <PostCard
                                getPostData={getPostData}
                                post={post}
                                post_creator={{
                                    image: profileContent.image,
                                    name: profileContent.name,
                                }}
                            />
                        ))}
                    {/* Add more posts here */}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="update-modal">
                        <UpdateProfileModal
                            profileContent={profileContent}
                            closeModal={() => {
                                setShowModal(false);
                            }}
                            onUpdate={handleUpdateProfile}
                        />
                    </div>
                </div>
            )}

            {isActivityModalOpen && (
                <div className="modal-overlay">
                    <div className="update-modal">
                        <ActivityLogModal
                            closeModal={() => {
                                setIsActivityModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
