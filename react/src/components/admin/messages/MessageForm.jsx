import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
export default function MessageForm(){ 
    const navigate = useNavigate();
    let { id } = useParams();
    const [message, setMessage] = useState({
        id: null,
        chat_room_id: "",
        text: "",
        sender_id:null,
        created_at: "",
        updated_at:"",
    
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/messages/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setMessage(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (message.id) {
            axiosClient
                .put(`/messages/${message.id}`, Message)
                .then(() => {
                    setNotification("Message was successfully updated");
                    navigate("/admin/message");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/message", message)
                .then(() => {
                    setNotification("Message was successfully created");
                    navigate("/admin/message");
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
            {message.id && <h1>Update text: {message.text}</h1>}
            {!message.id && <h1>New Message</h1>}
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
                            value={message.text}
                            onChange={(ev) =>
                                setMessage({ ...message, text: ev.target.value })
                            }
                            placeholder="text"
                        />
                        <input
                            value={message.Sender_id}
                            onChange={(ev) =>
                                setMessage({ ...message, Sender_id: ev.target.value })
                            }
                            placeholder="Sender_id"
                        />
                         <input
                            value={message.created_at}
                            onChange={(ev) =>
                                setMessage({ ...message, created_at: ev.target.value })
                            }
                            placeholder="Created_at"
                        />
                            <input
                            value={message.updated_at}
                            onChange={(ev) =>
                                setMessage({ ...message, updated_at: ev.target.value })
                            }
                            placeholder="updated_at"
                        />
                       
                      
                        
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
                        }



