import React from "react";
import imageSuccess from "../images/popup/popup-image-success.png";
import imageError from "../images/popup/popup-image-error.png";

function InfoTooltip({ onClose, isOpen, status: { imageType, textType } = {} }) {
    const images = {
        imageSuccess: imageSuccess,
        imageError: imageError,
    };

    const text = {
        textSuccess: "Вы успешно зарегистрировались!",
        textError: "Что-то пошло не так! Попробуйте еще раз.",
    };

    return (
        <div className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <img className="popup__image_type_tooltip" alt="изображение загружается" src={images[imageType]}></img>
                <h2 className="popup__title_type_tooltip">{text[textType]}</h2>
                <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;
