import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { HiOutlinePhotograph } from "react-icons/Hi";
export default function PostForm() {
const navigate = useNavigate();
let { id } = useParams();
const [post, setPost] = useState({
    creator_id: null,
    description: "",
    image: null,
});
const [errors, setErrors] = useState(null);
const [loading, setLoading] = useState(false);
const { setNotification } = useStateContext();
if (id) {
    useEffect(() => {
        setLoading(true);
        axiosClient
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
const onSubmit = (ev) => {
    ev.preventDefault();
    if (post.id) {
        axiosClient
            .put(`/admin/posts/${post.id}`, post)
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
        const formdata = new FormData();
        formdata.append('description', post.description);
        // formdata.append('creator_id', post.creator_id);
        // formdata.append('image',post.image);
        // formdata.append('image', null);
        // console.log(post.image);
        
        axiosClient
            .post("/admin/posts", formdata)
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
                      {/* <input
                            value={post.creator_id}
                            type="number"
                            min={1}
                            max={2}
                            onChange={(ev) =>
                                setPost({ ...post, creator_id: ev.target.value })
                            }
                            placeholder="Creator id"
                        /> */}
                   
                    <input type="file" id="file"onChange={(ev) =>
                            setPost({ ...post, image: ev.target.files[0] })
                        }/>
                            <label for="file" ><HiOutlinePhotograph/></label>
                    
                    <button className="btn btn-outline-success"style={{width:"100px",}}>Save</button>
                </form>
            )}
        </div>
    </>
);
                    }