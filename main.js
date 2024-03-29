(()=>{"use strict";var t=document.forms["edit-profile"],e=document.forms["new-place"],n=document.forms["edit-avatar"],r=document.forms["delete-card"],o=document.querySelector(".popup_type_image"),c=document.querySelector(".profile__edit-button"),a=document.querySelector(".profile__add-button"),i=Array.from(document.querySelectorAll(".popup")),u=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_avatar"),d=document.querySelector(".popup_type_delete-card"),f=document.querySelector(".places__list"),p=document.querySelector(".profile__image"),m=document.querySelector(".popup__input_type_name"),v=document.querySelector(".popup__input_type_description"),_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),h=e.elements["place-name"],b=e.elements.link,S=document.querySelector(".popup__caption"),C=document.querySelector(".popup__image");function k(t){if("Escape"===t.key){var e=i.find((function(t){return t.classList.contains("popup_is-opened")}));e&&q(e)}}function g(t){t.target===t.currentTarget&&q(t.target)}function E(t){q(t.target.closest(".popup"))}function L(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",k)}function q(t){t&&(t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",k))}var A="users/me",x="cards",T="likes",w={Authorization:"14b58559-029e-496e-9a10-e787d4f1cf4c","Content-Type":"application/json"},j=function(t){return t.ok?t.json():Promise.reject("Error: ".concat(t.status))};function O(t,e){return fetch("".concat("https://nomoreparties.co/v1/wff-cohort-9","/").concat(t),e).then(j)}function B(t,e,n){var r=e.deleteCardCallback,c=e.openImageCallback,a=e.handleLikesCallback,i=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),u=i.querySelector(".card__image"),l=i.querySelector(".card__title"),s=i.querySelector(".card__like-button"),d=i.querySelector(".card__like-counter");u.src=t.link,u.alt=t.name,l.textContent=t.name,d.textContent=t.likes.length;var f=i.querySelector(".card__delete-button");return n!==t.owner._id?f.style.display="none":f.addEventListener("click",(function(){var e=t._id;r(i,e)})),t.likes.some((function(t){return t._id===n}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){a(d,s,t)})),u.addEventListener("click",(function(){c(u,C,S,o)})),i}var P,I,D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".button",inactiveButtonClass:"button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},M=function(t,e,n){var r=t.querySelector(".".concat(e.id,"-error"));r&&(e.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent="")},N=function(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(n.removeAttribute("disabled",!1),n.classList.remove(e.inactiveButtonClass)):(n.setAttribute("disabled",!0),n.classList.add(e.inactiveButtonClass))};function H(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(n){return M(t,n,e)})),N(n,e,r)}function J(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";e.textContent=t?r:n}function G(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";e.preventDefault();var r=e.submitter,o=r.textContent;J(!0,r,o,n),t().then((function(){e.target.reset()})).catch((function(t){console.error("Ошибка: ".concat(t))})).finally((function(){J(!1,r,o,n)}))}function U(){m.value=_.textContent,v.value=y.textContent}function V(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}!function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.error):e.setCustomValidity(""),e.validity.valid?M(t,e,n):function(t,e,n){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(n.inputErrorClass),r.textContent=e.validationMessage,r.classList.add(n.errorClass)}(t,e,n)}(t,o,e),N(n,e,r)}))}))}(e,t)}))}(D);var z={deleteCardCallback:function(t,e){P=t,I=e,L(d)},openImageCallback:function(t,e,n,r){e.src=t.src,e.alt=t.alt,n.textContent=t.alt,L(r)},handleLikesCallback:function(t,e,n){e.classList.contains("card__like-button_is-active")?function(t){return O("".concat(x,"/").concat(T,"/").concat(t),{method:"DELETE",headers:w})}(n._id).then((function(n){e.classList.toggle("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(t){console.error("Произошла ошибка при удалении лайка:",t)})):function(t){return O("".concat(x,"/").concat(T,"/").concat(t),{method:"PUT",headers:w})}(n._id).then((function(n){e.classList.toggle("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(t){console.error("Произошла ошибка при добавлении лайка:",t)}))}};c.addEventListener("click",(function(){H(t,D),U(),L(u)})),a.addEventListener("click",(function(){H(l,D),L(l)})),p.addEventListener("click",(function(){H(s,D),L(s)})),i.forEach((function(t){var e=t.querySelector(".popup__close");t.addEventListener("click",g),e.addEventListener("click",E)}));var $="";u.addEventListener("submit",(function(t){G((function(){var e=m.value,n=v.value;return function(t,e){return O(A,{method:"PATCH",headers:w,body:JSON.stringify({name:t,about:e})})}(e,n).then((function(r){_.textContent=r.name,y.textContent=r.about,console.dir(e,n),U(),q(t.target.closest(".popup_is-opened"))}))}),t)})),l.addEventListener("submit",(function(t){!function(t,e,n){G((function(){return(t=h.value,r=b.value,O(x,{method:"POST",headers:w,body:JSON.stringify({name:t,link:r})})).then((function(t){var r=B(t,e,n);f.prepend(r),q(l)}));var t,r}),t)}(t,z,$)})),s.addEventListener("submit",(function(t){G((function(){return(t=n.elements["avatar-link"].value,O("".concat(A,"/avatar"),{method:"PATCH",headers:w,body:JSON.stringify({avatar:t})})).then((function(t){p.setAttribute("style","background-image: url('".concat(t.avatar,"')")),q(s)}));var t}),t)})),r.addEventListener("submit",(function(t){t.preventDefault(),function(t,e){(function(t){return O("".concat(x,"/").concat(t),{method:"DELETE",headers:w})})(e).then((function(){t.remove(),q(d)})).catch((function(t){console.error("Произошла ошибка при удалении карточки:",t)}))}(P,I)})),Promise.all([O(A,{method:"GET",headers:w}),O(x,{method:"GET",headers:w})]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return V(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?V(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];!function(t){_.textContent=t.name,y.textContent=t.about,p.setAttribute("style","background-image: url('".concat(t.avatar,"')")),$=t._id}(o),function(t,e,n){f.innerHTML="",t.forEach((function(t){var r=B(t,e,n);f.appendChild(r)}))}(c,z,o._id)})).catch((function(t){console.error("Произошла ошибка при получении данных:",t)}))})();