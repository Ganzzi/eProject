import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
export default function MessageForm(){ 
    const navigate = useNavigate();
    let { id } = useParams();
    const [Message, setMessage] = useState({
        id: null,
        paticipant: "",
        text: "",
        create_at: "",
    
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
        if (Message.id) {
            axiosClient
                .put(`/messages/${Message.id}`, Message)
                .then(() => {
                    setNotification("Message was successfully updated");
                    navigate("/admin/messages");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/messages", Message)
                .then(() => {
                    setNotification("Message was successfully created");
                    navigate("/admin/messages");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

}

