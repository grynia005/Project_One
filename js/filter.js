import {
  getAllPhoto,
  sectionPictures,
  allPhotoFragment,
  addFragmentToTheContainer,
} from "./pictures.js";

const filterDiv = document.querySelector(".img-filters");
const formFilter = document.querySelector(".img-filters__form");
const activeFilterClass = "img-filters__button--active";
const maxRandomPhoto = 12;
const waitingTime = 300;

function debounce(func, ms) {
  let timeout;
  return function (evt, data) {
    function fnCall() {
      clearTimeout(timeout);
      func(evt, data);
    }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}
const allFilterPhoto = debounce(allFilter, waitingTime);

function showFilter() {
  filterDiv.classList.remove("img-filters--inactive");
}

function activeFilter(btn) {
  const activeBtn = formFilter.querySelectorAll("button");
  activeBtn.forEach((el) => {
    el.classList.remove(activeFilterClass);
  });
  btn.classList.add(activeFilterClass);
}

function randomPhoto(array, numb) {
  const copyArray = JSON.parse(JSON.stringify(array));

  for (let i = copyArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = copyArray[i];
    copyArray[i] = copyArray[j];
    copyArray[j] = k;
  }
  return copyArray.splice(0, numb);
}

function filterReduceNumberComments(array) {
  const copyArray = JSON.parse(JSON.stringify(array));
  copyArray.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });
  return copyArray;
}

function allFilter(evt, arrayPhotos) {
  const targetElement = evt.target;
  let photos;
  switch (targetElement.id) {
    case "filter-default":
      photos = arrayPhotos;
      break;
    case "filter-random":
      photos = randomPhoto(arrayPhotos, maxRandomPhoto);
      break;
    case "filter-discussed":
      photos = filterReduceNumberComments(arrayPhotos);
      break;
    default:
  }
  getAllPhoto(photos);
  activeFilter(targetElement);
  addFragmentToTheContainer(sectionPictures, allPhotoFragment);
}

export { showFilter, allFilterPhoto, filterDiv };
