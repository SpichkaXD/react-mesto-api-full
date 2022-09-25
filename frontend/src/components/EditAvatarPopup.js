import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

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
            name="change-avatar"
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
                autoComplete="off"
                ref={avatarRef}
            />
            <span className="popup__error popup__error_visible" id="image-link-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
