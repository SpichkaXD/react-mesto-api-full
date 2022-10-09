import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    onCardClick,
    onCardLike,
    cards,
    onCardDelete,
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-cover" onClick={isEditAvatarPopupOpen}>
                    <img src={currentUser.avatar} alt="Изображение загружается" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__box">
                        <h1 className="profile__user-name">{currentUser.name}</h1>
                        <p className="profile__user-activity">{currentUser.about}</p>
                    </div>
                    <button
                        type="button"
                        aria-label="Редактировать"
                        className="profile__edit-button"
                        onClick={isEditProfilePopupOpen}
                    ></button>
                </div>
                <button
                    type="button"
                    aria-label="Добавить"
                    className="profile__add-button"
                    onClick={isAddPlacePopupOpen}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__container">
                {console.log(cards)}
                    {cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;
