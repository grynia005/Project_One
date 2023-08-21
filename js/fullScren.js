import { photos } from "./main.js";
import { addFragmentToTheContainer } from "./pictures.js";
console.log(photos);

const sectionPictures = document.querySelector(".pictures");
const sectionBigPicture = document.querySelector(".big-picture");
const bigPictureSocial = sectionBigPicture.querySelector(
  ".big-picture__social"
);
const bigIMG = sectionBigPicture.querySelector(".big-picture__img");
const socialHeader = sectionBigPicture.querySelector(".social__header");
const comentTemplate = document.querySelector("#social__comment");
const listOfComents = sectionBigPicture.querySelector(".social__comments");
const fragmentListComment = document.createDocumentFragment();
const buttonCancel = sectionBigPicture.querySelector(".big-picture__cancel");
const body = document.querySelector("body");
const buttonLoadMore = sectionBigPicture.querySelector(
  ".social__comments-loader"
);
const totalNumberComments = sectionBigPicture.querySelector(".comments-count");
const displayedNumberComments =
  sectionBigPicture.querySelector(".comments-shown");

let numberOfOutputComments = 5;
const stepComments = 5;

let currentComments = [];

function clearCommentList() {
  listOfComents.innerHTML = "";
}

function hideAddCommentsButton() {
  if (displayedNumberComments.textContent === totalNumberComments.textContent) {
    buttonLoadMore.classList.add("hidden");
  }
}

function loadComments() {
  numberOfOutputComments = addComent(numberOfOutputComments);
  clearCommentList();
  const arrComents = JSON.parse(JSON.stringify(currentComments));
  const displayedComents = checkingTheNumberOfComments(arrComents);
  displayedNumberComments.textContent = displayedComents.length;
  createListComents(displayedComents, fragmentListComment, createLiComent);
  addFragmentToTheContainer(listOfComents, fragmentListComment);
  hideAddCommentsButton()
}

function addComent(numb) {
  return (numb += stepComments);
}

function createFullSizePhoto(photo) {
  bigIMG.querySelector("img").src = photo.url;
  bigIMG.querySelector("img").setAttribute("alt", photo.decription);
  socialHeader.querySelector("img").src = photo.url; // тут може бути Ваша фотографія))
  socialHeader.querySelector(".social__caption").textContent = photo.decription;
  socialHeader.querySelector(".likes-count").textContent = photo.likes;
}

function createLiComent(el) {
  const copyTemplate = comentTemplate.content.cloneNode(true);
  copyTemplate.querySelector(".social__picture").src = el.avatar;
  copyTemplate.querySelector(".social__author").textContent = el.name;
  copyTemplate.querySelector(".social__text").textContent = el.message;
  return copyTemplate;
}

function checkingTheNumberOfComments(array) {
  array.splice(numberOfOutputComments, array.length - 5);
  return array;
}

function createListComents(array, fragment, callback) {
  const coments = checkingTheNumberOfComments(array);
  coments.forEach((el) => fragment.appendChild(callback(el)));
}

function closeFullscreenPhoto() {
  buttonLoadMore.removeEventListener("click", loadComments);
  buttonLoadMore.classList.remove("hidden");
  numberOfOutputComments = 5;
  clearCommentList();
  if (!sectionBigPicture.classList.contains("hidden")) {
    sectionBigPicture.classList.add("hidden");
    body.classList.remove("modal-open");
  }
}

sectionPictures.addEventListener("click", async (evt) => {
  try {
    const array = await photos;
    const targetElement = evt.target;
    body.classList.add("modal-open");
    const linkClick = targetElement.closest("[data-id]");
    const dataId = Number(linkClick.getAttribute("data-id"));
    const photo = array.find((photo) => photo.id === dataId);
    if (photo) {
      currentComments = photo.comments;
      sectionBigPicture.classList.remove("hidden");
      totalNumberComments.textContent = currentComments.length;
      const arrComents = JSON.parse(JSON.stringify(currentComments));
      const displayedComents = checkingTheNumberOfComments(arrComents);
      displayedNumberComments.textContent = displayedComents.length;
      createListComents(displayedComents, fragmentListComment, createLiComent);
      createFullSizePhoto(photo);
      addFragmentToTheContainer(listOfComents, fragmentListComment);
      buttonLoadMore.addEventListener("click", loadComments);
    }
  } catch (error) {
    console.error(error);
  }
});

buttonCancel.addEventListener("click", closeFullscreenPhoto);

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeFullscreenPhoto();
  }
});

export { body };
