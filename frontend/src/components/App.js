import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import PopupWithConfirm from "./PopupWithConfirm";

import { api } from "../utils/Api";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [selectedCard, setSelectedCard] = useState({});

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleImagePopupClick() {
        setIsImagePopupOpen(true);
    }

    function handlePopupWithConfirmClick() {
        setIsPopupWithConfirmOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsPopupWithConfirmOpen(false);
        setSelectedCard({});
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        handleImagePopupClick();
    }

    function handleDeleteCardClick(card) {
        setSelectedCard(card);
        handlePopupWithConfirmClick();
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.setLike(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    }

    function handleUpdateUser(user) {
        api.setUsersInfo(user)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    }

    function handleUpdateAvatar(user) {
        api.setUserAvatar(user)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    }

    // закрытие по оверлею
    function closePopupOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            closeAllPopups();
        }
    }
    // закрытие по нажатию esc
    useEffect(() => {
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen) {
            function handleEscClose(evt) {
                if (evt.key === "Escape") {
                    closeAllPopups();
                }
            }

            document.addEventListener("keydown", handleEscClose);
            return () => {
                document.removeEventListener("keydown", handleEscClose);
            };
        }
    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen]);

    useEffect(() => {
        Promise.all([api.getUsersInfo(), api.getCards()])
            .then(([user, cardInfo]) => {
                setCurrentUser(user);
                setCards(cardInfo);
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    isEditProfilePopupOpen={handleEditProfileClick}
                    isAddPlacePopupOpen={handleAddPlaceClick}
                    isEditAvatarPopupOpen={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCardClick}
                    cards={cards}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClose={closePopupOnOverlay}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClose={closePopupOnOverlay}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClose={closePopupOnOverlay}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup
                    onClose={closeAllPopups}
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onOverlayClose={closePopupOnOverlay}
                />

                <PopupWithConfirm
                    isOpen={isPopupWithConfirmOpen}
                    onClose={closeAllPopups}
                    onOverlayClose={closePopupOnOverlay}
                    card={selectedCard}
                    onConfirmDelete={handleCardDelete}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
