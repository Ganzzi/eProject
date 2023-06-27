import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { formatDateTime } from "../../../utils";
export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = async (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        await axiosClient.delete(`/admin/users/${user.id}`).then(async () => {
            // setNotification("User was successfully deleted");
            setAlerts({
                type: "info",
                message: "user was successfully deleted",
                time: new Date(),
            });
            await getUsers();
        });
    };

    const getUsers = async () => {
        setLoading(true);
        await axiosClient
            .get("/admin/users")
            .then(({ data }) => {
                setLoading(false);
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
                ></h1>
                <Link className="btn-add" to="/admin/users/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown" style={{ left: "5rem" }}>
                <table
                    className=""
                    style={{ with: "100%", paddingRight: "3rem" }}
                >
                    <thead className="thead-dark" style={{ with: "100%" }}>
                        <tr>
                            <th style={{ paddingRight: "7rem" }}>ID</th>
                            <th style={{ paddingRight: "7rem" }}>Image</th>
                            <th style={{ paddingRight: "7rem" }}>Name</th>
                            <th style={{ paddingRight: "7rem" }}>Email</th>
                            <th style={{ paddingRight: "7rem" }}>
                                Create Date
                            </th>
                            <th>Lock</th>
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

                                    <td> {formatDateTime(u.created_at)}</td>
                                    <td>{u.lock == 0 ? "Unlock" : "Locked"}</td>
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
