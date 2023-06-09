import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";




export default function PostForm() {
const navigate = useNavigate();

let { id } = useParams();
const [post, setPost] = useState({
    id: null,
    creator_id:null,
    description: "",
    image: "",
    userimage:"",
    field:"",
    create_at:"",
   update_at: "",
 
});
const [errors, setErrors] = useState(null);
const [loading, setLoading] = useState(false);
const { setNotification } = useStateContext();



if (id) {
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/posts/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setPost(data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
}

const onSubmit = (ev) => {
    ev.preventDefault();
    if (post.id) {
        axiosClient
            .put(`/posts/${post.id}`, post)
            .then(() => {
                setNotification("post was successfully updated");
                navigate("/admin/posts");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    } else {
        axiosClient
            .post("/posts", post)
            .then(() => {
                setNotification("post was successfully created");
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
                    <input
                        value={post.description}
                        onChange={(ev) =>
                            setPost({ ...post, description: ev.target.value })
                        }
                        placeholder="description"
                    />
                     
                    <input
                        value={post.image}
                        onChange={(ev) =>
                            setPost({ ...post, image: ev.target.value })
                        }
                        type="file" id="file-input" name="ImageStyle"
                        placeholder="image"
                    />
                     <input
                        value={post.userimage}
                        onChange={(ev) =>
                            setPost({ ...post, userimage: ev.target.value })
                        }
                        type="file" id="file-input" name="ImageStyle"
                        placeholder="userimage"
                    />
                    <input
                        value={post.field}
                        onChange={(ev) =>
                            setPost({ ...post, field: ev.target.value })
                        }
                        placeholder="field"
                    />
                   <input
                        value={post.create_at}
                        onChange={(ev) =>
                            setPost({ ...post, create_at: ev.target.value })
                           
                        }
                        placeholder="create_at"
                       
                    />
                    <input
                        value={post.update_at}
                        onChange={(ev) =>
                            setPost({ ...post, update_at: ev.target.value })
                           
                        }
                        placeholder="update_at"
                       
                    />
           
        
                    <button className="btn">Save</button>
                </form>
            )}
        </div>
    </>
);
                    }