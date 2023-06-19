import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/admin/users/${user.id}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers();
        });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/admin/users")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        fontFamily: "fantasy",
                        justifycontent: "space-between",
                    }}
                >
                    Users
                </h1>
                <Link className="btn-add" to="/admin/users/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr
                            style={{
                                fontFamily: "cursive",
                                textAlign: "center",
                                padding: "40px",
                            }}
                        >
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Bio</th>

                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>
                                        <img
                                            src={
                                                "http://127.0.0.1:8000/api/images/" +
                                                u.image
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.gender}</td>
                                    <td>{u.bio}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/admin/users/" + u.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() => onDeleteClick(u)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
