import { React } from "react";

import { Switch, Route, Link} from "react-router-dom";

function Header({ onLogout, userInfo }) {
    return (
        <header className="header">
            <Link className="header__logo" href="#"></Link>
            <Switch>
                <Route path="/sign-in">
                    <a className="header__link" href="/sign-up">
                        Регистрация
                    </a>
                </Route>
                <Route path="/sign-up">
                    <a className="header__link" href="/sign-in">
                        Войти
                    </a>
                </Route>
                <Route exact path="/">
                    <div className="header__email">{userInfo}</div>
                    <a className="header__link" onClick={onLogout}href="/sign-in">
                        Выйти
                    </a>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;
