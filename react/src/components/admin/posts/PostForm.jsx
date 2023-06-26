import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
// import { HiOutlinePhotograph } from "react-icons/Hi";
export default function PostForm() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [post, setPost] = useState({
        description: "",
        // image: null,
    });
   
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();
    if (id) {
        useEffect(async() => {
            setLoading(true);
           await axiosClient
                .get(`/admin/posts/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setPost(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }
    const onSubmit = async(ev) => {
        ev.preventDefault();
        if (post.id) {
           await axiosClient
                .put(`/admin/posts/${post.id}`, post)
                .then(() => {
                    setAlerts({
                        type: "info",
                        message: "user was successfully updated",
                        time: new Date(),
                    });
                    navigate("/admin/posts");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            const formdata = new FormData();
            formdata.append("description", post.description);
            // formdata.append("image", post.image);
            axiosClient
                .post("/admin/posts", formdata)
                .then(() => {
                    setAlerts({
                        type: "info",
                        message: "user was successfully updated",
                        time: new Date(),
                    });
                    navigate("/admin/posts");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {post.id && <h1>Update post: {post.description}</h1>}
            {!post.id && <h1>New post</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input style={{paddingRight:"30rem"}}
                            value={post.description}
                            onChange={(ev) =>
                                setPost({
                                    ...post,
                                    description: ev.target.value,
                                })
                            }
                            placeholder="description"
                        />
                        <button
                            className="btn btn-outline-success"
                            style={{ width: "100px" }}
                        >
                            Save
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
