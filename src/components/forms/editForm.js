import { patchUser } from "../api.js";
import { closePopup } from "../modal.js";
import {
  nameInput,
  jobInput,
  userJobElement,
  userNameElement,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";

export function setInitialEditProfileFormValues() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}

export function handleFormSubmit(event) {
  const makeRequest = () =>
    patchUser(nameInput.value, jobInput.value).then((user) => {
      userNameElement.textContent = user.name;
      userJobElement.textContent = user.about;
      setInitialEditProfileFormValues();
      closePopup(event.target.closest(".popup"));
    });

  handleSubmit(makeRequest, event);
}
