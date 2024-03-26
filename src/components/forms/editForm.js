import { patchUser } from "../../components/api.js";
import { closePopup } from "../../components/modal.js";
import {
  nameInput,
  jobInput,
  userJobElement,
  userNameElement,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";

// Установка начальных значений в форме редактирования профиля
export function setInitialEditProfileFormValues() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}

// Обработчик события отправки формы редактирования профиля
export function handleFormSubmit(evt) {
  // Функция для выполнения запроса на сервер для обновления данных профиля
  function makeRequest() {
    const name = nameInput.value;
    const about = jobInput.value;
    // Выполнение запроса на сервер
    return patchUser(name, about)
      .then((dataUser) => {
        // Обновление отображаемых данных профиля на странице
        userNameElement.textContent = dataUser.name;
        userJobElement.textContent = dataUser.about;
        // Установка начальных значений в форме редактирования профиля
        setInitialEditProfileFormValues();
        // Закрытие попапа после успешного обновления профиля
        closePopup(evt.target.closest(".popup_is-opened"));
      });
  }

  // Вызов общей функции для обработки отправки формы
  handleSubmit(makeRequest, evt);
}
