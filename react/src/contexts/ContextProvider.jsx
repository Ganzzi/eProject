import { createContext, useContext, useState } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
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
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    const [notifications, setNotifications] = useState([]);
    const [alerts, setAlerts] = useState({
        type: null,
        message: null,
        time: null,
    });

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                notifications,
                setNotifications,
                alerts,
                setAlerts,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
