import { popupsArray } from "./constats.js";

function handleEscClick(event) {
  if (event.key !== "Escape") return;

  const openedPopup = popupsArray.find((popup) =>
    popup.classList.contains("popup_is-opened")
  );

  if (openedPopup) {
    closePopup(openedPopup);
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function handleCloseButtonClick(event) {
  closePopup(event.target.closest(".popup"));
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClick);
}

function closePopup(popup) {
  if (!popup) return;

  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClick);
}

export {
  handleOverlayClick,
  closePopup,
  openPopup,
  handleCloseButtonClick,
};
