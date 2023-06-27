import { Navigate, createBrowserRouter } from "react-router-dom";
import {
    Login,
    NotFound,
    Signup,
    Posts,
    Profile,
    Message,
    Users,
    UserForm,
    AdminPosts,
    AdminPostForm,
    Adminchatrooms,
} from "./components";
import { Dashboard, GuestPage, HomePage } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestPage />,
        children: [
            {
                path: "/",
                element: <Navigate to={"/login"} />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                path: "/posts",
                element: <Posts />,
            },
            {
                path: "/messages",
                element: <Message />,
            },
            {
                path: "/profile/:id",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/admin",
        element: <Dashboard />,
        children: [
            {
                path: "/admin",
                element: <Navigate to={"/admin/users"} />,
            },
            {
                path: "/admin/users",
                element: <Users />,
            },
            {
                path: "/admin/users/new",
                element: <UserForm key={"userCreate"} />,
            },
            {
                path: "/admin/users/:id",
                element: <UserForm key={"userUpdate"} />,
            },
            {
                path: "/admin/posts",
                element: <AdminPosts />,
            },
            {
                path: "/admin/posts/:id",
                element: <AdminPostForm key={"postUpdate"} />,
            },
            {
                path: "/admin/chatrooms",
                element: <Adminchatrooms />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
