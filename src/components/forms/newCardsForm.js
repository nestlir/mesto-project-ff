import { postCard } from "../api.js";
import { createCard } from "../card.js";
import { closePopup } from "../modal.js";
import {
  newCardForm,
  newPlaceNameInput,
  newLinkInput,
  placesList,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";

// Универсальная функция для добавления карточки в список мест
function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, callbacks);
  cardList[method](cardElement);
}

// Обработчик события отправки формы добавления карточки
export function handleNewCardFormSubmit(event, callbacksObject, userId) {
  function makeRequest() {
    return postCard(newPlaceNameInput.value, newLinkInput.value)
      .then((card) => {
        // Создаем HTML-элемент для новой карточки
        const newCardElement = createCard(card, callbacksObject, userId);
        // Добавляем созданный HTML-элемент на страницу
        placesList.prepend(newCardElement); // Предполагается, что placesList - это контейнер для карточек
        closePopup(newCardForm); // Закрытие попапа после успешного добавления карточки
      });
  }

  handleSubmit(makeRequest, event);
}