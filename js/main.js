import {
  addFragmentToTheContainer,
  getAllPhoto,
  sectionPictures,
  allPhotoFragment,
} from "./pictures.js";
import { showFilter, allFilterPhoto, filterDiv } from "./filter.js";

const errorInfo = document.querySelector(".error_section");
const urlServ = "http://localhost:3000/photos/";

async function getPhotosFromServer() {
  try {
    const response = await fetch(urlServ);
    if (!response.ok) {
      throw new Error("З сервером щось не ОК!");
    }

    const arrayPhotos = await response.json();
    console.log(Array.isArray(arrayPhotos));
    return arrayPhotos;
  } catch (error) {
    errorInfo.classList.remove("hidden");
    console.error("Сталася страшна помилка", error);
  }
}
const photos = getPhotosFromServer();

photos
  .then(function (data) {
    getAllPhoto(data);
    addFragmentToTheContainer(sectionPictures, allPhotoFragment);
    showFilter();
    filterDiv.addEventListener("click", (evt) => {
      allFilterPhoto(evt, data);
    });
  })
  .catch((error) => {
    console.error(
      "Сталася страшна помилка під час отримання фотографій",
      error
    );
  });

export { photos, urlServ };
