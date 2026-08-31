import { popupsArray } from "./constats.js";

const getOpenedPopup = () =>
  popupsArray.find((popup) => popup.classList.contains("popup_is-opened"));

function handleEscClick(event) {
  if (event.key !== "Escape") {
    return;
  }

  const openedPopup = getOpenedPopup();

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
  const popup = event.target.closest(".popup");
  closePopup(popup);
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClick);
}

function closePopup(popup) {
  if (!popup) {
    return;
  }

  popup.classList.remove("popup_is-opened");

  if (!getOpenedPopup()) {
    document.removeEventListener("keydown", handleEscClick);
  }
}

export {
  handleOverlayClick,
  closePopup,
  openPopup,
  handleCloseButtonClick,
};