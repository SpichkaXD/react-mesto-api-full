class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    register(password, email) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                email,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    authorize(password, email) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                email,
            }),
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        });
    }

    getContent(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            return res.json();
        });
    }
}

const auth = new Auth({
    baseUrl: "http://api.spichka.nomoredomains.icu",
});

export default auth;
