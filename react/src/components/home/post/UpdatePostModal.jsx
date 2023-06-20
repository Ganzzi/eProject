import React, { useState } from "react";

const UpdatePostModal = ({ closeModal, onUpdate }) => {
    const [post, setPost] = useState({
        description:description,
    });

    const handleSubmitPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("description", description);
        
        onUpdate(formData);
    };

    return (
        <div className="update-profile-modal">
            <div className="modal-header">
                <h2 className="modal-title">Update Post</h2>
                <button
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmitPost}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                        Description:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={description}
                            onChange={(e) =>
                                setPost({ ...post, description: e.target.value })
                            }
                            required
                        />
                    </div>
                    {/* <div className="mb-3">
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
                    </div> */}
                    
                    <button type="submit" className="btn btn-primary">
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePostModal;
