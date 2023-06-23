import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { HiOutlinePhotograph } from "react-icons/Hi";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", nameRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append(
            "password_confirmation",
            passwordConfirmationRef.current.value
        );

        axiosClient
            .post("/signup", formData)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setError(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Sign Up for free</h1>
                    {error && (
                        <div className="alert">
                            {Object.keys(error).map((key) => (
                                <p key={key}>{error[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <input
                        type="file"
                        id="file-signup"
                        onChange={(ev) => setImage(ev.target.files[0])}
                        placeholder="image"
                    />
                    <label htmlFor="file-signup">
                        <HiOutlinePhotograph size={40} color="black" />
                    </label>
                    <button className="btn btn-block btn-primary" type="submit">
                        Signup
                    </button>
                    <p className="message">
                        Already Register?
                        <Link to={"/login"}>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
