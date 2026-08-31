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

export function handleNewCardFormSubmit(event, callbacksObject, getUserId) {
  const makeRequest = () =>
    postCard(newPlaceNameInput.value, newLinkInput.value).then((card) => {
      const userId =
        typeof getUserId === "function" ? getUserId() : getUserId;

      placesList.prepend(createCard(card, callbacksObject, userId));
      closePopup(newCardForm);
    });

  handleSubmit(makeRequest, event);
}
