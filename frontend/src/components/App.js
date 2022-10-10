import React from "react";
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import { useEffect, useState } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
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
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import * as auth from '../utils/Auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isloggedIn'));
  const [userEmail, setUserEmail] = useState('');
  const [infoTooltipStatus, setInfoTooltipStatus] = useState({})
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
    setIsInfoTooltipOpen(false)
    setSelectedCard({});
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleImagePopupClick() {
    setIsImagePopupOpen(true);
  }

  function handlePopupWithConfirmClick() {
    setIsPopupWithConfirmOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closePopupOnOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id))
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }

  function handleUpdateUser(user) {
    api.setUsersInfo(user) 
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
    })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }

  function handleUpdateAvatar(user) {
    api.setUserAvatar(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }

  useEffect(() => {
    if(isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isPopupWithConfirmOpen) {
      function handleEscClose(evt) {
        if(evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEscClose);
      return () => { 
        document.removeEventListener('keydown', handleEscClose); 
      }
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen, isPopupWithConfirmOpen]);

  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([api.getUsersInfo(), api.getCards()])
        .then(([user, cardInfo]) => {
          setCurrentUser(user);
          setCards(cardInfo);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  })

  function getUserData () {    
    auth.getEmail()
    .then((res) => {    
      setUserEmail(res.email);
      setIsLoggedIn(true);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history])


  function handleLogin({email, password}) {
    auth.authorize({email, password})
      .then((data) => {
        setUserEmail(email);
        setIsLoggedIn(() => {
          localStorage.setItem('isloggedIn', true)
          return true;
        });
      })
      .catch((error) => {
        setInfoTooltipStatus({
          imageType: 'imageError',
          textType: 'textError'});
        handleInfoTooltipOpen();
        console.log(`Ошибка: ${error}`);
      })
  }

  function handleLogout() {
    auth.logOut()
    .then(() => {
      setIsLoggedIn(() => {
        localStorage.removeItem('isloggedIn');
        return false;
      });
      setUserEmail('');
      history.push('/sign-in');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
  }

  function handleRegister({email, password}) {
    auth.register({email, password})
    .then((data) => {
      if(data) {
        setInfoTooltipStatus({
          imageType: 'imageSuccess',
          textType: 'textSuccess'});
        handleInfoTooltipOpen();
        history.push('/sign-in');
      }
    })
    .catch((error) => {
      setInfoTooltipStatus({
        imageType: 'imageError',
        textType: 'textError'});
      handleInfoTooltipOpen();
      console.log(`Ошибка: ${error}`);
    })
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Header
        userEmail={userEmail}
        onLogOut={handleLogout}
      />

      <Switch>
        <ProtectedRoute exact path="/"
          component={Main}
          isLogged={isLoggedIn}
          isEditProfilePopupOpen={handleEditProfileClick}
          isAddPlacePopupOpen={handleAddPlaceClick}
          isEditAvatarPopupOpen={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          cards={cards}
        />
        <Route path="/sign-up">
          <Register 
          onRegister={handleRegister}
          />
        </Route>
        <Route path="/sign-in">
          <Login 
          onLogin={handleLogin}
          />
        </Route>
        <Route path="*">
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in"/>}
        </Route>
      </Switch>

      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        status={infoTooltipStatus}
      />

      <Footer/>

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={closePopupOnOverlay}
        onUpdateUser={handleUpdateUser} 
      /> 

      < AddPlacePopup
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
