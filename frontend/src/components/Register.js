import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        return onRegister(registerData.password, registerData.email);
    }

    return (
        <section className="main-page">
            <h1 className="main-page__title">Регистрация</h1>
            <form className="main-page" onSubmit={handleSubmit}>
                <input
                    required
                    minLength="2"
                    maxLength="30"
                    className="main-page__text"
                    type="email"
                    placeholder="Email"
                    value={registerData.email || ""}
                    onChange={handleChange}
                    name="email"
                />
                <input
                    required
                    minLength="2"
                    maxLength="30"
                    className="main-page__text"
                    type="password"
                    placeholder="Пароль"
                    value={registerData.password || ""}
                    onChange={handleChange}
                    name="password"
                />
                <button type="submit" className="main-page__submit">
                    Зарегистрироваться
                </button>
            </form>
            <div className="main-page__signup">
                <p>
                    Уже зарегистрированы?
                    <Link to="/sign-in" className="main-page__link">
                        Войти
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default Register;
