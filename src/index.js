import "./pages/index.css";

import {
  handleOverlayClick,
  openPopup,
  handleCloseButtonClick,
} from "./components/modal.js";
import { createCard, handleLikes } from "./components/card.js";
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
  popupImage,
  popupImageCaption,
  buttonTypeCard,
} from "./components/constats.js";
import {
  validation,
  clearValidation,
  validationConfig,
} from "./components/validation.js";
import { getCards, getUser } from "./components/api.js";
import {
  handleCardDelete,
  openPopupDelete,
} from "./components/forms/deleteForm.js";
import { handleAvatarFormSubmit } from "./components/forms/avatarForm.js";
import { handleNewCardFormSubmit } from "./components/forms/newCardsForm.js";
import {
  handleFormSubmit,
  setInitialEditProfileFormValues,
} from "./components/forms/editForm.js";

validation(validationConfig);

function openImagePopup(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageCaption.textContent = cardImage.alt;
  openPopup(buttonTypeCard);
}

const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  handleLikesCallback: handleLikes,
};

profileEditButton.addEventListener("click", () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openPopup(editForm);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardForm);
});

avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
});

popupsArray.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);

  const closeButton = popup.querySelector(".popup__close");

  if (closeButton) {
    closeButton.addEventListener("click", handleCloseButtonClick);
  }
});

function setUserInfo(user) {
  userNameElement.textContent = user.name;
  userJobElement.textContent = user.about;
  avatarImage.style.backgroundImage = "url(\"" + user.avatar + "\")";
}

function renderCards(cards, userId) {
  placesList.replaceChildren(
    ...cards.map((card) => createCard(card, callbacksObject, userId))
  );
}

editForm.addEventListener("submit", handleFormSubmit);

newCardForm.addEventListener("submit", (event) => {
  handleNewCardFormSubmit(event, callbacksObject, () => userId);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleCardDelete);

let userId = "";

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    setUserInfo(user);
    renderCards(cards, userId);
  })
  .catch((error) => {
    console.error("Не удалось загрузить данные Mesto:", error);
  });
