import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// Объявление переменных для поиска DOM-элементов
const editProfilePopupElement = document.querySelector('.popup_type_edit');
const addCardPopupElement = document.querySelector('.popup_type_new-card');
const imagePopupElement = document.querySelector('.popup_type_image');
const editProfileFormElement = editProfilePopupElement.querySelector('.popup__form');
const addCardFormElement = addCardPopupElement.querySelector('.popup__form');
const placesListElement = document.querySelector('.places__list');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const nameInputElement = editProfileFormElement.querySelector('.popup__input_type_name');
const descriptionInputElement = editProfileFormElement.querySelector('.popup__input_type_description');
const cardNameInputElement = addCardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInputElement = addCardFormElement.querySelector('.popup__input_type_url');
const popupImageElement = imagePopupElement.querySelector('.popup__image');
const editProfileButtonElement = document.querySelector('.profile__edit-button');

// Функция инициализации модальных окон
function setPopupListeners() {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close');
    const overlay = popup;

    closeButton.addEventListener('click', () => closePopup(popup));

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closePopup(popup);
      }
    });
  });

  const addCardButton = document.querySelector('.profile__add-button');

  addCardButton.addEventListener('click', () => openPopup(addCardPopupElement));
}

// Функция открытия попапа профиля с данными пользователя
function openEditProfilePopup() {
  setProfileData(nameInputElement, descriptionInputElement); // Передаем переменные в функцию setProfileData
  openPopup(editProfilePopupElement); // Открытие попапа профиля
}

// Функция установки данных профиля в инпуты попапа редактирования профиля
function setProfileData(nameInput, descriptionInput) {
  if (nameInput && descriptionInput) {
    nameInput.value = profileTitleElement.textContent;
    descriptionInput.value = profileDescriptionElement.textContent;
  }
}

// Добавление обработчика для кнопки редактирования профиля
editProfileButtonElement.addEventListener('click', openEditProfilePopup);

// Функция открытия попапа с изображением
function openImagePopup(imageLink, imageName) {
  const popupCaption = imagePopupElement.querySelector('.popup__caption');

  popupImageElement.src = imageLink;
  popupImageElement.alt = imageName;
  popupCaption.textContent = imageName;

  openPopup(imagePopupElement);
}

// Функция обновления информации о пользователе на странице
function updateProfile(name, description) {
  profileTitleElement.textContent = name;
  profileDescriptionElement.textContent = description;
}

// Функция обработки события submit для формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  updateProfile(nameInputElement.value, descriptionInputElement.value);

  closePopup(evt.currentTarget.closest('.popup'));
}

// Функция создания новой карточки
function createNewCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  placesListElement.prepend(cardElement);
}

// Функция обработки события submit для формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  createNewCard({
    name: cardNameInputElement.value,
    link: cardLinkInputElement.value
  });

  evt.currentTarget.reset();
  closePopup(evt.currentTarget.closest('.popup'));
}

// Вызов функции инициализации модальных окон
setPopupListeners();

// Вызываем функцию для вывода карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  placesListElement.appendChild(cardElement);
});

// Прикрепляем обработчики к формам редактирования профиля и добавления новой карточки
editProfileFormElement.addEventListener('submit', handleFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
