export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
            credentials: "include",
        }).then(this._handleResponse);
    }

    addCard(card) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        }).then(this._handleResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
            credentials: "include",
        }).then(this._handleResponse);
    }

    getUsersInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
            credentials: "include",
        }).then(this._handleResponse);
    }

    setUsersInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._handleResponse);
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._handleResponse);
    }

    changeLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers,
            credentials: "include",
        }).then(this._handleResponse);
    }
}

export const api = new Api({
    url: "https://api.spichka.nomoredomains.icu",
    headers: {
        "Content-Type": "application/json",
    },
});
