import React from "react";
function PopupWithConfirm({ isOpen, onClose, onOverlayClose, card, onConfirmDelete }) {
    function handleDeleteClick(e) {
        e.preventDefault();
        onConfirmDelete(card);
        onClose();
    }

    return (
        <div
            className={isOpen ? "popup popup_type_confirmation popup_opened" : "popup popup_type_confirmation"}
            onMouseDown={onOverlayClose}
        >
            <div className="popup__container">
                <form action="#" name="confirm" className="popup__form" noValidate onSubmit={handleDeleteClick}>
                    <h2 className="popup__title popup__title_type_confirmation">Вы уверены?</h2>
                    <button
                        type="submit"
                        aria-label="Сохранить"
                        className="popup__submit-button  popup__submit-button_type_confirmation"
                    >
                        Да
                    </button>
                </form>
                <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithConfirm;
