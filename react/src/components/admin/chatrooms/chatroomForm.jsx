import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState ,} from "react";

import { useStateContext } from "../../../contexts/ContextProvider.jsx"
import axiosClient from "../../../axios-client.js";

export default function chatroomForm(){ 
    const navigate = useNavigate();
    let { id } = useParams();
    
    const [chatrooms, setchatrooms] = useState({
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
                .get(`/chatrooms/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setchatrooms(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (chatrooms.id) {
            axiosClient
                .put(`/chatrooms/${chatrooms.id}`, chatrooms)
                .then(() => {
                    setNotification("chatrooms was successfully updated");
                    navigate("/admin/chatrooms");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/chatrooms", chatrooms)
                .then(() => {
                    setNotification("chatrooms was successfully created");
                    navigate("/admin/chatrooms");
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
            {chatrooms.id && <h1>Update text: {chatrooms.text}</h1>}
            {!chatrooms.id && <h1>New chatrooms</h1>}
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
                            value={chatrooms.text}
                            onChange={(ev) =>
                                setchatrooms({ ...chatrooms, text: ev.target.value })
                            }
                            placeholder="text"
                        />
                     
                         <input type="datetime-local" id="birthdaytime" name="birthdaytime"
                           placeholder="created_at"/>
  
                          <input type="datetime-local" id="birthdaytime" name="birthdaytime"
                           placeholder="updated_at"/>
  
                       
                      
                        
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
                        }



