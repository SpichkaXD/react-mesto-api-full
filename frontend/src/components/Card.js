import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "card__delete-button_active" : ""}`;

    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <div className="card__image-background">
                <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
            </div>
            <button
                type="button"
                aria-label="Удалить"
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            ></button>
            <div className="card__rectangle">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__like-element">
                    <button
                        type="button"
                        aria-label="Лайк"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    ></button>
                    <div className="card__counter">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;
