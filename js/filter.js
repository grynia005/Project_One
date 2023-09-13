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
const waitingTime = 300

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
allFilter = debounce(allFilter, waitingTime);

function showFilter() {
  filterDiv.classList.remove("img-filters--inactive");
}

function activeFilter(btn) {
  console.log(btn.classList);
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
  copyArray.sort(function (b, a) {
    return a.comments.length - b.comments.length;
  });
  return copyArray;
}

function allFilter(evt, arrayPhotos) {
  const targetElement = evt.target;
  switch (targetElement.id) {
    case "filter-default":
      console.log(targetElement.id);
      getAllPhoto(arrayPhotos);
      activeFilter(targetElement);
      addFragmentToTheContainer(sectionPictures, allPhotoFragment);
      break;
    case "filter-random":
      getAllPhoto(randomPhoto(arrayPhotos, maxRandomPhoto));
      activeFilter(targetElement);
      addFragmentToTheContainer(sectionPictures, allPhotoFragment);
      break;
    case "filter-discussed":
      getAllPhoto(filterReduceNumberComments(arrayPhotos));
      activeFilter(targetElement);
      addFragmentToTheContainer(sectionPictures, allPhotoFragment);
      break;
    default:
      break;
  }
}

export { showFilter, allFilter, filterDiv };
