import { deleteLikeCard, addLikeCard } from "./api.js";
import {
  popupImage,
  popupImageCaption,
  buttonTypeCard,
} from "./constats.js";

export function createCard(card, callbacksObject, userId) {
  const {
    deleteCardCallback,
    openImageCallback,
    handleLikesCallback,
  } = callbacksObject;

  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  const isOwner = userId === card.owner._id;

  if (isOwner) {
    deleteButton.addEventListener("click", () => {
      deleteCardCallback(cardElement, card._id);
    });
  } else {
    deleteButton.remove();
  }

  const isLiked = card.likes.some((like) => like._id === userId);

  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    handleLikesCallback(cardLikeCounter, cardLikeButton, card);
  });

  cardImage.addEventListener("click", () => {
    openImageCallback(
      cardImage,
      popupImage,
      popupImageCaption,
      buttonTypeCard
    );
  });

  return cardElement;
}

export function handleLikes(cardLikeCounter, cardLikeButton, card) {
  const isLiked = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  );

  const request = isLiked
    ? deleteLikeCard(card._id)
    : addLikeCard(card._id);

  request
    .then((updatedCard) => {
      cardLikeButton.classList.toggle(
        "card__like-button_is-active",
        !isLiked
      );
      cardLikeCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.error("Unable to update card like:", error);
    });
}