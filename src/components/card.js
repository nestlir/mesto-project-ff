// Импорт функций для работы с лайками карточек из модуля API
import { deleteLikeCard, addLikeCard } from "../components/api";

// Импорт элементов DOM и констант из отдельного модуля
import {
  popupImage,
  popupImageCaption,
  buttonTypeCard,
} from "../components/constats";

// Функция для создания карточки на основе данных и колбэков
export function createCard(cards, callbacksObject, userId) {
  const {
    deleteCardCallback,
    openImageCallback,
    handleLikesCallback,
  } = callbacksObject;
  
  // Создание карточки на основе шаблона
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);
    
  // Получение элементов карточки
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  
  // Заполнение данных карточки
  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.textContent = cards.name;
  cardLikeCounter.textContent = cards.likes.length;
  
  // Установка слушателя на кнопку удаления карточки, если пользователь является владельцем
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (userId !== cards.owner._id) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      const cardId = cards._id;
      deleteCardCallback(cardElement, cardId);
    });
  }
  
  // Проверка наличия лайка пользователя в массиве likes
  const isLiked = cards.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  
  // Установка слушателя на кнопку лайка
  cardLikeButton.addEventListener("click", () => {
    handleLikesCallback(cardLikeCounter, cardLikeButton, cards);
  });

  // Установка слушателя на изображение карточки для открытия в модальном окне
  cardImage.addEventListener("click", () => {
    openImageCallback(cardImage, popupImage, popupImageCaption, buttonTypeCard);
  });

  // Возвращаем созданный элемент карточки
  return cardElement;
}

// Функция для обработки лайков карточек
export function handleLikes(cardLikeCounter, cardLikeButton, cards) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    // Если карточка уже была лайкнута, убираем лайк
    deleteLikeCard(cards._id)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении лайка:", err);
      });
  } else {
    // Если карточка не была лайкнута, добавляем лайк
    addLikeCard(cards._id)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при добавлении лайка:", err);
      });
  }
}
