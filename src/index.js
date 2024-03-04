import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// Функция инициализации модальных окон
function setPopupListeners() {
  const popups = document.querySelectorAll('.popup');
  const editProfilePopup = document.querySelector('.popup_type_edit');
  const newCardPopup = document.querySelector('.popup_type_new-card');
  const imagePopup = document.querySelector('.popup_type_image');

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

  const editProfileButton = document.querySelector('.profile__edit-button');
  const addCardButton = document.querySelector('.profile__add-button');

  editProfileButton.addEventListener('click', () => {
    openPopup(editProfilePopup);
    populateProfileForm(); // Вставляем данные пользователя в форму при открытии попапа профиля
  });
  
  addCardButton.addEventListener('click', () => openPopup(newCardPopup));
}

// Вызов функции инициализации модальных окон
setPopupListeners();

// DOM узел для списка карточек
const placesList = document.querySelector('.places__list');

// Функция открытия попапа с изображением
function openImagePopup(imageLink, imageName) {
  const popupImage = document.querySelector('.popup_type_image .popup__image');
  const popupCaption = document.querySelector('.popup_type_image .popup__caption');

  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;

  openPopup(document.querySelector('.popup_type_image'));
}

// Вывод карточек на страницу
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
    placesList.appendChild(cardElement);
  });
}

// Вызываем функцию для вывода карточек на страницу
renderInitialCards();

// Функция обновления информации о пользователе на странице
function updateProfile(name, description) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

// Функция заполнения формы профиля текущими данными пользователя
function populateProfileForm() {
  const currentName = document.querySelector('.profile__title').textContent;
  const currentDescription = document.querySelector('.profile__description').textContent;
  const nameInput = document.querySelector('.popup_type_edit .popup__input_type_name');
  const descriptionInput = document.querySelector('.popup_type_edit .popup__input_type_description');

  nameInput.value = currentName;
  descriptionInput.value = currentDescription;
}

// Функция обработки события submit для формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const formElement = evt.currentTarget;
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const descriptionInput = formElement.querySelector('.popup__input_type_description');

  updateProfile(nameInput.value, descriptionInput.value);

  closePopup(formElement.closest('.popup'));
}

// Находим форму редактирования профиля в DOM
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');

// Прикрепляем обработчик к форме редактирования профиля
editProfileForm.addEventListener('submit', handleFormSubmit);

// Функция создания новой карточки
function createNewCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);

  placesList.prepend(cardElement);
}

// Функция обработки события submit для формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const formElement = evt.currentTarget;
  const nameInput = formElement.querySelector('.popup__input_type_card-name');
  const linkInput = formElement.querySelector('.popup__input_type_url');

  createNewCard({
    name: nameInput.value,
    link: linkInput.value
  });

  formElement.reset();

  closePopup(formElement.closest('.popup'));
}

// Находим форму добавления новой карточки в DOM
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

// Прикрепляем обработчик к форме добавления новой карточки
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
