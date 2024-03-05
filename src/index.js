import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// Кешируем часто используемые DOM-элементы
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

// Функция для установки обработчиков событий для модальных окон
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

  const editProfileButton = document.querySelector('.profile__edit-button');
  const addCardButton = document.querySelector('.profile__add-button');

  // Устанавливаем обработчик для кнопки редактирования профиля
  editProfileButton.addEventListener('click', () => {
    const profileName = profileTitle.textContent;
    const profileDesc = profileDescription.textContent;
    const editPopup = document.querySelector('.popup_type_edit');
    const nameInput = editPopup.querySelector('.popup__input_type_name');
    const descriptionInput = editPopup.querySelector('.popup__input_type_description');

    nameInput.value = profileName;
    descriptionInput.value = profileDesc;

    openPopup(editPopup);
  });

  // Устанавливаем обработчик для кнопки добавления новой карточки
  addCardButton.addEventListener('click', () => openPopup(document.querySelector('.popup_type_new-card')));
}

setPopupListeners(); // Вызываем функцию для установки обработчиков событий для модальных окон

const placesList = document.querySelector('.places__list');

// Функция для открытия модального окна с изображением
function openImagePopup(imageLink, imageName) {
  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;

  openPopup(imagePopup);
}

// Функция для отображения начальных карточек на странице
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
    placesList.appendChild(cardElement);
  });
}

renderInitialCards();

// Функция для обновления информации о пользователе на странице
function updateProfile(name, description) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

// Функция для обработки события отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const formElement = evt.currentTarget;
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const descriptionInput = formElement.querySelector('.popup__input_type_description');

  updateProfile(nameInput.value, descriptionInput.value);

  closePopup(formElement.closest('.popup'));
}

editProfileForm.addEventListener('submit', handleFormSubmit);
// Функция для создания новой карточки
function createNewCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  placesList.prepend(cardElement);
}

// Функция для обработки события отправки формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

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

addCardForm.addEventListener('submit', handleAddCardFormSubmit);