// Импорт стилей для страницы
import "./pages/index.css";

// Импорт функций для работы с модальными окнами
import {
  handleOverlayClick,
  openPopup,
  handleCloseButtonClick
} from "./components/modal.js";

// Импорт функций для создания карточек и работы с лайками
import { createCard, handleLikes } from "./components/card.js";

// Импорт элементов DOM и констант из отдельного модуля
import {
  popupsArray,
  placesList,
  editForm,
  editFormElement,
  profileEditButton,
  userNameElement,
  userJobElement,
  newCardForm,
  profileAddButton,
  avatarForm,
  avatarImage,
  deleteCardForm,
} from "./components/constats.js";

// Импорт функций для валидации форм
import { validation, clearValidation, validationConfig} from "./components/validation.js";

// Импорт функций для работы с API (запросы к серверу)
import {
  getCards,
  getUser,
} from "./components/api.js";

// Импорт функций для работы с формой удаления карточки
import { handleCardDelete, openPopupDelete } from "./components/forms/deleteForm.js";

// Импорт функций для работы с формой изменения аватара
import { handleAvatarFormSubmit } from "./components/forms/avatarForm.js";

// Импорт функций для работы с формой добавления новой карточки
import { handleNewCardFormSubmit } from "./components/forms/newCardsForm.js";

// Импорт функций для работы с формой редактирования профиля
import { handleFormSubmit, setInitialEditProfileFormValues} from "./components/forms/editForm.js";

// Выполнение инициализации валидации формы
validation(validationConfig);

// Функция открытия модального окна с изображением карточки
function openImagePopup(
  cardImg,
  popupImage,
  popupImageCaption,
  buttonTypeCard
) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openPopup(buttonTypeCard);
}

// Объект с колбэками для работы с событиями карточек
const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  handleLikesCallback: handleLikes,
};

// Установка слушателя на кнопку открытия формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openPopup(editForm);
});

// Установка слушателя на кнопку открытия формы добавления карточки
profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardForm);
});

// Установка слушателя на кнопку открытия формы изменения аватара
avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
});

// Установка слушателей для закрытия модального окна при клике на оверлей и кнопку закрытия
popupsArray.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  popup.addEventListener("click", handleOverlayClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
});

// Функция для установки информации о пользователе на страницу
let userId = "";
function setUserInfo(user) {
  userNameElement.textContent = user.name;
  userJobElement.textContent = user.about;
  avatarImage.setAttribute(
    "style",
    `background-image: url('${user.avatar}')`
  );
  userId = user._id;
}

// Функция для рендеринга карточек на страницу
export function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  cards.forEach(card => {
    const cardElement = createCard(card, callbacksObject, userId);
    placesList.appendChild(cardElement);
  });
}

// Установка слушателей для отправки форм на сервер
editForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", (event) => {
  handleNewCardFormSubmit(event, callbacksObject, userId);
});
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleCardDelete);

// Выполнение асинхронных запросов на сервер для получения информации о пользователе и карточек
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, callbacksObject, user._id);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });
