import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onOverlayClose, onUpdateAvatar }) {
    const avatarRef = useRef(null);

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="popup_type_edite-avatar"
            title="Обновить аватар"
            buttonName="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClose={onOverlayClose}
            onSubmit={handleSubmit}
        >
            <input
                required
                type="url"
                name="avatar"
                id="image-link-input"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
            />
            <span className="popup__error popup__error_visible" id="image-link-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
