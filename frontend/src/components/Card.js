import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "card__delete-button_active" : " "}`;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;

    function handleCardClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <li className="card">
            <img src={card.link} alt={card.name} className="card__image" onClick={handleCardClick} />
            <button
                type="button"
                aria-label="Удалить"
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            />
            <div className="card__box">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__like-box">
                    <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <div className="card__counter">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;
