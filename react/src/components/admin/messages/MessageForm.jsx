import React from "react";

const MessageForm = () => {
    return <div>MessageForm</div>;
};

export default function MessageForm(){ 
const navigate = useNavigate();
let { id } = useParams();
const [Message, setMessage] = useState({
    id: null,
    paticipant: "",
    text: "",
    create_at: "",
    sender_id: "",
});
const [errors, setErrors] = useState(null);
const [loading, setLoading] = useState(false);
const { setNotification } = useStateContext();

if (id) {
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/Message/${id}`)
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
            .put(`/Message/${Message.id}`, Message)
            .then(() => {
                setNotification("Message was successfully updated");
                navigate("/admin/Message");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    } else {
        axiosClient
            .post("/Message", Message)
            .then(() => {
                setNotification("Message was successfully created");
                navigate("/admin/Message");
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

