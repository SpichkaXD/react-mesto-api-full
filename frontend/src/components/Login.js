import React from "react";
import { useState } from "react";

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(loginData);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    return (
        <div className="register">
            <form className="register__container" onSubmit={handleSubmit}>
                <h2 className="register__title">Вход</h2>
                <input
                    required
                    minLength="2"
                    maxLength="30"
                    type="email"
                    name="email"
                    id="email-input"
                    value={loginData.email}
                    onChange={handleChange}
                    className="register__input register__input_type_email"
                    placeholder="Email"
                />

                <input
                    required
                    minLength="2"
                    maxLength="30"
                    type="password"
                    name="password"
                    id="password-input"
                    value={loginData.password}
                    onChange={handleChange}
                    className="register__input register__input_type_password"
                    placeholder="Пароль"
                />

                <button type="submit" aria-label="Регистрация" className="register__submit-button">
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;
