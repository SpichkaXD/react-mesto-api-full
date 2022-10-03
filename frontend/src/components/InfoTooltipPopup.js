import React from "react";

function InfoTooltipPopup({ infoStatus, onClose }) {
    let logoClassName = "";
    let message = "";
    if (infoStatus) {
        if (infoStatus == "success") {
            logoClassName = "popup__infotooltip-logo_success";
            message = "Вы успешно зарегистрировались!";
        } else {
            logoClassName = "popup__infotooltip-logo_error";
            message = "Что-то пошло не так! Попробуйте еще раз.";
        }
    }

    return (
        <section className={`popup popup_infotooltip ${infoStatus ? "popup_opened" : ""}`}>
            <div className="popup__block">
                
                <div name="form" className="popup__infotooltip-container">
                <button className="popup__close-button" onClick={onClose} type="reset"></button>
                    <div className={"popup__infotooltip-logo " + logoClassName}></div>
                    <p className="popup__infotooltip-title">{message}</p>
                </div>
            </div>
        </section>
    );
}
export default InfoTooltipPopup;
