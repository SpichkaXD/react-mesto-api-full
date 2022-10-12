import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(registerData);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    }

    return (
        <div className="register">
            <form className="register__container" onSubmit={handleSubmit}>
                <h2 className="register__title">Регистрация</h2>
                <input
                    required
                    minLength="2"
                    maxLength="30"
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    id="email-input"
                    className="register__input register__input_type_email"
                    placeholder="Email"
                />

                <input
                    required
                    minLength="2"
                    maxLength="30"
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    id="password-input"
                    className="register__input register__input_type_password"
                    placeholder="Пароль"
                />

                <button type="submit" aria-label="Регистрация" className="register__submit-button">
                    Зарегистрироваться
                </button>
            </form>
            <Link className="register__link" to="/sign-in">
                Уже зарегистрированы? Войти
            </Link>
        </div>
    );
}

export default Register;
