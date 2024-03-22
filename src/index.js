import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation, checkFormValidity } from './components/validation.js';
import Api from './components/api.js';
import { domElements } from './components/dom.js';

const {
  editProfilePopupElement,
  addCardPopupElement,
  imagePopupElement,
  editProfileFormElement,
  addCardFormElement,
  placesListElement,
  profileTitleElement,  
  profileDescriptionElement,
  profileAvatarElement,
  nameInputElement,
  descriptionInputElement,
  cardNameInputElement,
  cardLinkInputElement,
  popupImageElement,
  editProfileButtonElement
} = domElements;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '14b58559-029e-496e-9a10-e787d4f1cf4c',
    'Content-Type': 'application/json'
  }
});

function renderUserInfo(userData) {
  profileTitleElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileAvatarElement.src = userData.avatar;
  profileAvatarElement.alt = userData.name;
}

api.getUserInfo()
  .then((userData) => {
    renderUserInfo(userData);
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке информации о пользователе: ${err}`);
  });

api.getInitialCards()
  .then((cardsData) => {
    cardsData.forEach((cardData) => {
      const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
      placesListElement.appendChild(cardElement);
    });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке начальных карточек: ${err}`);
  });

function updateUserInfoOnServer() {
  const newName = nameInputElement.value;
  const newDescription = descriptionInputElement.value;

  api.updateUserInfo({ name: newName, about: newDescription })
    .then(updatedUserInfo => {
      renderUserInfo(updatedUserInfo);
      closePopup(editProfilePopupElement);
    })
    .catch(error => {
      console.error('Ошибка при обновлении информации о пользователе:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  setPopupListeners();
});

function setPopupListeners() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.addEventListener('click', handlePopupClick);
  });
  const addCardButton = document.querySelector('.profile__add-button');
  addCardButton.addEventListener('click', () => openPopup(addCardPopupElement));
}

function handlePopupClick(event) {
  const popup = event.target.closest('.popup');
  if (!popup) return;
  if (event.target.classList.contains('popup__close') || event.target === popup) {
    closePopup(popup);
  }
}

if (editProfileButtonElement) {
  editProfileButtonElement.addEventListener('click', openEditProfilePopup);
}

if (editProfileFormElement) {
  editProfileFormElement.addEventListener('submit', handleFormSubmit);
}

if (addCardFormElement) {
  addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
}

function openEditProfilePopup() {
  setProfileData(nameInputElement, descriptionInputElement);
  openPopup(editProfilePopupElement);
}

function createNewCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  placesListElement.prepend(cardElement);
}

function setProfileData(nameInput, descriptionInput) {
  if (nameInput && descriptionInput) {
    nameInput.value = profileTitleElement.textContent;
    descriptionInput.value = profileDescriptionElement.textContent;
  }
}

function openImagePopup(imageLink, imageName) {
  const popupCaption = imagePopupElement.querySelector('.popup__caption');

  popupImageElement.src = imageLink;
  popupImageElement.alt = imageName;
  popupCaption.textContent = imageName;

  openPopup(imagePopupElement);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  updateUserInfoOnServer();
  clearValidation(evt.currentTarget);
  checkFormValidity(evt.currentTarget);
  closePopup(evt.currentTarget.closest('.popup'));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  createNewCard({
    name: cardNameInputElement.value,
    link: cardLinkInputElement.value
  });
  clearValidation(evt.currentTarget);
  checkFormValidity(evt.currentTarget);
  closePopup(evt.currentTarget.closest('.popup'));
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__input_type_error'
};
enableValidation(validationConfig);

cards.forEach(card => {
  const cardElement = document.querySelector(`#card-${card.id}`);
  if (!cardElement) return;
  const likesCountElement = cardElement.querySelector('.card__likes-count');
  likesCountElement.textContent = card.likes.length;
});