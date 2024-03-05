import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// Объявление переменных для поиска DOM-элементов
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const addCardForm = addCardPopup.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

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

  const editProfileButton = document.querySelector('.profile__edit-button');
  const addCardButton = document.querySelector('.profile__add-button');

  editProfileButton.addEventListener('click', () => openPopup(editProfilePopup));
  addCardButton.addEventListener('click', () => openPopup(addCardPopup));
}

// Функция открытия попапа с изображением
function openImagePopup(imageLink, imageName) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;

  openPopup(imagePopup);
}

// Функция обновления информации о пользователе на странице
function updateProfile(name, description) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

// Функция обработки события submit для формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  updateProfile(nameInput.value, descriptionInput.value);

  closePopup(evt.currentTarget.closest('.popup'));
}

// Функция создания новой карточки
function createNewCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  placesList.prepend(cardElement);
}

// Функция обработки события submit для формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  createNewCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  });

  evt.currentTarget.reset();
  closePopup(evt.currentTarget.closest('.popup'));
}

// Вызов функции инициализации модальных окон
setPopupListeners();

// Вызываем функцию для вывода карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  placesList.appendChild(cardElement);
});

// Прикрепляем обработчики к формам редактирования профиля и добавления новой карточки
editProfileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
