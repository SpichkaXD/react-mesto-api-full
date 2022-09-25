export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

export const content = document.querySelector(".content");
export const profile = content.querySelector(".profile");
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupUserName = document.querySelector(".popup__input_type_name");
export const popupUserActivity = document.querySelector(".popup__input_type_activity");
export const buttonAdd = document.querySelector(".profile__add-button");
// export const elementsContainer = document.querySelector(".elements__container");
export const buttonEditProfile = profile.querySelector(".profile__edit-button");
export const buttonEditAvatar = document.querySelector(".profile__avatar-cover");
export const popupEditAvatar = document.querySelector(".popup_type_change-avatar");


