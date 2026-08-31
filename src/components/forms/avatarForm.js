import {
  avatarFormElement,
  avatarImage,
  avatarForm,
} from "../constats.js";
import { patchAvatar } from "../api.js";
import { closePopup } from "../modal.js";
import { handleSubmit } from "./utilsForms.js";

export function handleAvatarFormSubmit(event) {
  const makeRequest = () => {
    const avatar = avatarFormElement.elements["avatar-link"].value;

    return patchAvatar(avatar).then((user) => {
      avatarImage.style.backgroundImage = "url(\"" + user.avatar + "\")";
      closePopup(avatarForm);
    });
  };

  handleSubmit(makeRequest, event);
}
