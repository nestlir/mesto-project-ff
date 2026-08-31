import { deleteCardApi } from "../api.js";
import { openPopup, closePopup } from "../modal.js";
import { deletePopup } from "../constats.js";

let selectedCard;
let selectedCardId;

export const openPopupDelete = (cardElement, cardId) => {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openPopup(deletePopup);
};

export function handleCardDelete(event) {
  event.preventDefault();

  if (!selectedCard || !selectedCardId) return;

  const submitButton = event.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = "Удаление...";

  deleteCardApi(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closePopup(deletePopup);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch((error) => {
      console.error("Не удалось удалить карточку:", error);
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
}
