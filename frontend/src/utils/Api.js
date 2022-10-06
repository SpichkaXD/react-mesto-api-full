export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    getAllData() {
        return Promise.all([this.getCards(), this.getUsersInfo()]);
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
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
            credentials: 'include'
        })        
        .then(this._handleResponse);
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

    setLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
            credentials: "include",
        }).then(this._handleResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
            credentials: "include",
        }).then(this._handleResponse);
    }
}

export const api = new Api({
    url: "http://api.spichka.nomoredomains.icu",
    // url: "https://nomoreparties.co/v1/cohort-44",
    headers: {
        // authorization: "96c1b86f-aa6e-4f39-8274-9861f5042d0a",
        "Content-Type": "application/json",
    },
});
