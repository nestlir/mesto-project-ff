import { popupsArray } from './constats.js';

// Функция для обработки нажатия клавиши Escape
const handleEscClick = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find(popup => popup.classList.contains('popup_is-opened'));
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// Функция для обработки клика по оверлею
const handleOverlayClick = (evt) => { 
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

// Функция для обработки клика по кнопке закрытия попапа
const handleCloseButtonClick = (evt) => {
  const button = evt.target;
  const popup = button.closest('.popup');
  closePopup(popup);
};

// Функция для открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", handleEscClick);
};

// Функция для закрытия попапа
const closePopup = (popup) => {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClick);
  }
};

export { 
  handleOverlayClick,
  closePopup, 
  openPopup,
  handleCloseButtonClick
};
