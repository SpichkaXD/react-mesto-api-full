import React from "react";
import { Route, Switch, Link } from "react-router-dom";

function Header({ onLogOut, userEmail }) {
    return (
        <header className="header">
            <Link className="header__logo" to="#"></Link>
            <Switch>
                <Route exact path="/">
                    <div className="header__info">
                        <p className="header__email">{userEmail}</p>
                        <Link className="header__login" to="/sign-in" onClick={onLogOut}>
                            Выйти
                        </Link>
                    </div>
                </Route>
                <Route path="/sign-up">
                    <Link className="header__login" to="/sign-in">
                        Войти
                    </Link>
                </Route>
                <Route path="/sign-in">
                    <Link className="header__login" to="/sign-up">
                        Регистрация
                    </Link>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;
