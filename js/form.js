import { urlServ } from "./main.js";
import {
  body,
  showFullScreen,
} from "./fullScren.js";
import { testImage } from "./іmageEditing.js";
import { closeSlider } from "./slider.js";
import { originalImage } from "./slider.js";
import { addFragmentToTheContainer } from "./pictures.js";
import { getAllPhoto } from "./pictures.js";
import { sectionPictures } from "./pictures.js";
import { allPhotoFragment } from "./pictures.js";
import { photos } from "./main.js";

const alphanumericPattern = /^[a-zA-Z0-9]+$/;

const imageEditingForm = document.querySelector(".img-upload__overlay");
const imageForm = document.querySelector(".img-upload__form");
const inputUpload = document.querySelector("#upload-file");
const inputHashtags = document.querySelector(".text__hashtags");
const textareaComment = document.querySelector(".text__description");
const closestButton = document.querySelector("#upload-cancel");
const maxlengthComent = 140;
const maxlengthHashtags = 20;
const maxNumberHashtags = 5;

inputHashtags.required = false;
textareaComment.required = false;

inputUpload.addEventListener("change", (evt) => {
  const uploadFile = evt.target.files[0];
  if (uploadFile) {
    imageEditingForm.classList.remove("hidden");
    body.classList.add("modal-open");
    const reader = new FileReader();
    reader.onload = function (evt) {
      testImage.src = evt.target.result;
    };
    reader.readAsDataURL(uploadFile);
  }
});

document
  .querySelector(".img-upload__submit")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const hashtagsValid = validationOfHashtags(event);
    const commentValid = validationOfComent(event);

    if (hashtagsValid && commentValid) {
      console.log("Успішний успіх, форма відправлена))");
      const formData = new FormData(imageForm);
      formData.set("url", testImage.src);
      formData.set("filter", testImage.style.filter);
      const formDataObject = {};
      for (const [key, value] of formData.entries()) {
        formDataObject[key] = value;
      }

      console.log(formDataObject);
      try {
        const response = await sendDataServer(formData, urlServ);
        if (response.ok) {
          const responseData = await response.json();
          closestForm();
          await getAllPhoto(responseData);
          addFragmentToTheContainer(sectionPictures, allPhotoFragment);
          showPop("success");
          sectionPictures.addEventListener("click", (evt) => {
            showFullScreen(evt, responseData)
          })
        }
      } catch (error) {
        showPop("error");
        console.error(error);
      }
    }
  });

async function sendDataServer(dataObj, url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: dataObj,
    });
    if (!response.ok) {
      console.log("Чергова страшна помилка чи то сервера чи ще шось))");
    } else return response;
  } catch (error) {
    console.error(error);
  }
}

function showPop(status) {
  const template = document.querySelector(`#${status}`);
  const copyTemplate = template.content.cloneNode(true);
  document.body.append(copyTemplate);
  const sectionStatus = document.querySelector(`.${status}`);
  document.querySelector(`.${status}__button`).addEventListener("click", () => {
    console.log("test button");
    closePop(sectionStatus);
  });
}

function closePop(element) {
  element.remove();
}

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const sectSuccess = document.querySelector(".success");
    const sectError = document.querySelector(".error");
    if (sectSuccess) {
      closePop(sectSuccess);
    }
    if (sectError) {
      closePop(sectError);
    }
  }
});

function validationOfHashtags(event) {
  let enteredValueHTeg = inputHashtags.value;
  const arrayValue = enteredValueHTeg.split(" ");
  return arrayСheck(arrayValue, inputHashtags);
}

function arrayСheck(array, input) {
  input.setCustomValidity("");
  console.log(array);
  let isValid = true;
  array.forEach((element) => {
    if (element !== "" && element[0] !== "#") {
      input.setCustomValidity('Тег має починатися з грат "#');
      isValid = false;
    } else if (element !== "" && element.length < 2) {
      input.setCustomValidity('Тег не може складатися лише з грат "#');
      isValid = false;
    } else if (element.length > maxlengthHashtags) {
      input.setCustomValidity(
        'Тег не може складатися з більш ніж 20 символів включаючи грати "#'
      );
      isValid = false;
    } else if (
      element !== "" &&
      !alphanumericPattern.test(element.substring(1))
    ) {
      input.setCustomValidity(
        "Тег має складатися з літер і чисел і не може містити прогалини, спецсимволи (#, @, $ і т. п.), символи пунктуації (тире, дефіс, кома тощо), емодзі і т.д. ;"
      );
      isValid = false;
    }
  });

  if (!checkForDuplicates(array)) {
    input.setCustomValidity(
      "Теги мають бути унікальними в незалежності від регістра"
    );
    isValid = false;
  } else if (array.length > maxNumberHashtags) {
    input.setCustomValidity(
      `Максимальна кількість тегів не може складати більше ${maxNumberHashtags}`
    );
    isValid = false;
  }

  input.reportValidity();
  return isValid;
}
function checkForDuplicates(array) {
  const set = new Set(array.map((el) => el.toLowerCase()));
  return set.size === array.length;
}

textareaComment.addEventListener("input", validationOfComent);

function validationOfComent() {
  let isValid = true;
  let enteredValueComent = textareaComment.value;
  if (
    enteredValueComent !== "" &&
    enteredValueComent.length > maxlengthComent
  ) {
    textareaComment.setCustomValidity(
      "Коментар не може складатися з більше ніж 140 символів"
    );
    isValid = false;
  } else {
    textareaComment.setCustomValidity("");
  }

  textareaComment.reportValidity();
  return isValid;
}

function closestForm() {
  if (!imageEditingForm.classList.contains("hidden")) {
    imageEditingForm.classList.add("hidden");
    body.classList.remove("modal-open");
    inputUpload.value = "";
    imageForm.reset();
  }
  closeSlider(slider);
  originalImage();
}

closestButton.addEventListener("click", closestForm);

document.addEventListener("keydown", (evt) => {
  if (
    evt.key === "Escape" &&
    !(
      document.activeElement === inputHashtags ||
      document.activeElement === textareaComment
    )
  )
    closestForm();
});