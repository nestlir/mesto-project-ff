import { avatarFormElement, avatarImage } from "../constats.js";
import { patchAvatar } from "../api.js";
import { closePopup } from "../modal.js";
import { handleSubmit } from "./utilsForms.js";

// Функция для обработки отправки формы добавления аватара
export function handleAvatarFormSubmit(event) {
  // Функция для отправки запроса на сервер
  function makeRequest() {
    const avatar = avatarFormElement.elements["avatar-link"].value;
    // Отправка запроса на обновление аватара
    return patchAvatar(avatar)
      .then((res) => {
        // Обновление аватара на странице
        avatarImage.setAttribute("style", `background-image: url('${res.avatar}')`);
        // Закрытие попапа после успешного обновления аватара
        closePopup(avatarForm);
      });
  }

  // Обработка отправки формы с использованием вспомогательной функции
  handleSubmit(makeRequest, event);
}
