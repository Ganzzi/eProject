import React, { useState } from "react";

const UpdateProfileModal = ({ closeModal, profileContent, onUpdate }) => {
    const [profile, setProfile] = useState({
        name: profileContent.name,
        email: null,
        image: null,
        bio: profileContent.bio,
        gender: profileContent.gender,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", profile.name);
        if (profile.email) {
            formData.append("email", profile.email);
        }
        if (profile.image) {
            formData.append("image", profile.image);
        }
        formData.append("bio", profile.bio);
        formData.append("gender", profile.gender);

        onUpdate(formData);
    };

    return (
        <div className="update-profile-modal">
            <div className="modal-header">
                <h2 className="modal-title">Update Profile</h2>
                <button
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={profile.name}
                            onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            defaultValue={profileContent.email}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image:
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            accept="image/*"
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    image: e.target.files[0],
                                })
                            }
                        />
                        {!profile.image && (
                            <img
                                src={
                                    "http://127.0.0.1:8000/api/images/" +
                                    profileContent.image
                                }
                                className="img-fluid my-2"
                                alt=""
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                            Bio:
                        </label>
                        <textarea
                            className="form-control"
                            id="bio"
                            value={profile.bio}
                            onChange={(e) =>
                                setProfile({ ...profile, bio: e.target.value })
                            }
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                            Gender:
                        </label>
                        <select
                            className="form-control"
                            id="gender"
                            value={profile.gender}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    gender: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
