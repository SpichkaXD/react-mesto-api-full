import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

function AddPlacePopup({ isOpen, onClose, onOverlayClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name="popup_type_add-card"
            title="Новое место"
            buttonName="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClose={onOverlayClose}
            onSubmit={handleSubmit}
        >
            <input
                required
                minLength="2"
                maxLength="30"
                type="text"
                name="name"
                id="place-input"
                className="popup__input popup__input_type_place"
                placeholder="Название"
                value={name || ""}
                onChange={handleNameChange}
            />
            <span className="popup__error popup__error_visible" id="place-input-error"></span>
            <input
                required
                type="url"
                name="link"
                id="link-input"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                value={link || ""}
                onChange={handleLinkChange}
            />
            <span className="popup__error popup__error_visible" id="link-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
