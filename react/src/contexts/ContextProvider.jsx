import { createContext, useContext, useState } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }) =>
{
    const [user, setUser] = useState({
        role_id: 2,
        bio: "",
        created_at: "",
        email: "",
        email_verified_at: null,
        gender: "",
        id: 0,
        image: "",
        name: "",
        updated_at: "",
    });
    const [role, setRole] = useState(2);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState("");

    const setToken = (token) =>
    {
        _setToken(token);
        if (token)
        {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else
        {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setNotification = (message) =>
    {
        _setNotification(message);

        setTimeout(() =>
        {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                notification,
                setNotification,
                setRole,
                role,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
