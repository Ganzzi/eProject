import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import axiosClient from "../../../axios-client.js";

export default function ChatRoomForm() {
    const navigate = useNavigate();
    let { id } = useParams();

    const [chatrooms, setchatrooms] = useState({
        id: null,
        created_at: "",
        updated_at: "",
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/admin/chatrooms/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    console.log(data);
                    setchatrooms(data.data);
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
                .put(`/admin/chatrooms/${chatrooms.id}`, chatrooms)
                .then(() => {
                    setAlerts({
                        type: "Update",
                        message: "chatrooms was successfully updated",
                        time: new Date(),
                    });
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
                .post("/admin/chatrooms", chatrooms)
                .then(() => {
                    setAlerts({
                        type: "Create",
                        message: "chatrooms was successfully created",
                        time: new Date(),
                    });
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
}
