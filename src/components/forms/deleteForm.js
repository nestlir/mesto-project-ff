import { deleteCardApi } from "../api.js";
import { openPopup, closePopup } from "../modal.js";
import { deletePopup } from "../constats.js";

let selectedCard;
let id;

// Функция открытия попапа для подтверждения удаления карточки
export const openPopupDelete = (cardElement, cardId) => {
  selectedCard = cardElement;
  id = cardId;
  openPopup(deletePopup);
};

// Функция закрытия попапа подтверждения удаления карточки
const closePopupDelete = () => {
  closePopup(deletePopup);
};

// Функция удаления карточки
export function deleteCard(selectedCard, id) {
  // Отправляем запрос на сервер для удаления карточки
  deleteCardApi(id)
    .then(() => {
      // Удаляем карточку из DOM после успешного удаления
      selectedCard.remove();
      // Закрываем попап после успешного удаления
      closePopupDelete();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

// Обработчик события отправки формы для удаления карточки
export function handleCardDelete(evt) {
  evt.preventDefault();
  // Вызываем функцию удаления карточки
  deleteCard(selectedCard, id);
}
