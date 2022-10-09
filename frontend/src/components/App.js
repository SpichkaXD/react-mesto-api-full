import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltipPopup from "./InfoTooltipPopup";
import { api } from "../utils/Api";
import * as Auth from "../utils/Auth";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [infoStatus, setInfoStatus] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [selectedCard, setSelectedCard] = useState({});

    const history = useHistory();

    function handleCardClick(card) {
        setSelectedCard(card);
        handleImagePopupClick();
    }

    function handleDeleteCardClick(card) {
        setSelectedCard(card);
        handlePopupWithConfirmClick();
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsPopupWithConfirmOpen(false);
        setSelectedCard({});
        setInfoStatus(false);
    }

    // закрытие по оверлею
    function closePopupOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            closeAllPopups();
        }
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
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

    useEffect(() => {
        if (loggedIn) {
            getUserData();
        }
    });

    function getUserData() {
        Auth.getEmail()
            .then((res) => {
                setUserInfo(res.email);
                setLoggedIn(true);
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    }

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUsersInfo(), api.getCards()])
                .then(([user, cardInfo]) => {
                    setCurrentUser(user);
                    setCards(cardInfo);
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`);
                });
        }
    }, [loggedIn]);


    useEffect(() => {
        if (loggedIn) {
            history.push("/");
        }
    }, [loggedIn, history]);

    // useEffect(() => {
    //     handlTokenCheck();
    //     if (loggedIn) {
    //         api.getAllData()
    //             .then(([data, user]) => {
    //                 setCards(data);
    //                 setCurrentUser(user);
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [loggedIn]);

    
    // function handlTokenCheck() {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         Auth.getContent(token)
    //             .then((res) => {
    //                 if (res) {
    //                     setLoggedIn(true);
    //                     setUserInfo(res.data.email);
    //                     history.push("/");
    //                 }
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }

    const onRegister = (password, email) => {
        Auth.register(password, email)
            .then((res) => {
                if (res) {
                    setInfoStatus("success");
                    history.push("/sign-in");
                }
            })
            .catch((e) => {
                setInfoStatus("fail");
            });
    };

    const onLogin = (password, email) => {
        Auth.authorize(password, email)
            .then((res) => {
                setUserInfo(email);
                setLoggedIn(() => {
                    localStorage.setItem("loggedIn", true);
                    return true;
                });
                // .then((res) => {
                //     if (res.token) {
                //         localStorage.setItem("token", res.token);
                //         setUserInfo(email);
                //         setLoggedIn(true);
                //     } else {
                //         setInfoStatus("fail");
                //     }
            })
            .catch((e) => {
                setInfoStatus("fail");
            });
    };

    // const onLogout = () => {
    //     setLoggedIn(false);
    //     localStorage.removeItem("token");
    //     history.push("/sign-in");
    // };
    const onLogout = () => {
        Auth.logOut()
            .then(() => {
                setLoggedIn(() => {
                    localStorage.removeItem("loggedIn");
                    return false;
                });
                setUserInfo("");
                history.push("/sign-in");
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            });
    };

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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header userInfo={userInfo} onLogout={onLogout} />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        isEditProfilePopupOpen={handleEditProfileClick}
                        isAddPlacePopupOpen={handleAddPlaceClick}
                        isEditAvatarPopupOpen={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCardClick}
                        cards={cards}
                    />
                    <Route path="/sign-up">
                        <Register onRegister={onRegister} />
                    </Route>
                    <Route path="/sign-in">
                        <Login onLogin={onLogin} />
                    </Route>
                    <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
                </Switch>

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

                <InfoTooltipPopup infoStatus={infoStatus} onClose={closeAllPopups} />

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
