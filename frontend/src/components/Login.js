import React, { useState } from "react";

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(loginData.password, loginData.email);
    }

    return (
        <section className="main-page">
            <h1 className="main-page__title">Вход</h1>
            <form className="main-page" onSubmit={handleSubmit}>
                <input
                    required
                    name="email"
                    className="main-page__text"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={loginData.email || ''}
                />
                <input
                    required
                    className="main-page__text"
                    type="password"
                    placeholder="Пароль"
                    onChange={handleChange}
                    value={loginData.password || ''}
                    name="password"
                />
                <button type="submit" aria-label="Войти" className="main-page__submit">
                    Войти
                </button>
            </form>
        </section>
    );
}

export default Login;
