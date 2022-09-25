import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";

function EditProfilePopup({ isOpen, onClose, onOverlayClose, onUpdateUser }) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen, currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonName="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClose={onOverlayClose}
            onSubmit={handleSubmit}
        >
            <input
                required
                minLength="2"
                maxLength="40"
                type="text"
                name="name"
                id="name-input"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                value={name || ""}
                onChange={handleNameChange}
                autoComplete="off"
            />
            <span className="popup__error popup__error_visible" id="name-input-error"></span>
            <input
                required
                minLength="2"
                maxLength="200"
                type="text"
                name="about"
                id="activity-input"
                className="popup__input popup__input_type_activity"
                placeholder="Профессия"
                value={description || ""}
                onChange={handleDescriptionChange}
                autoComplete="off"
            />
            <span className="popup__error popup__error_visible" id="activity-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
