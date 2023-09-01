import { addFragmentToTheContainer } from "./pictures.js";
import { getAllPhoto } from "./pictures.js";
import { sectionPictures } from "./pictures.js";
import { allPhotoFragment } from "./pictures.js";

const errorInfo = document.querySelector(".error_section");

const urlServ = "http://localhost:3000/photos";

async function getPhotosFromServer() {
  try {
    const response = await fetch("http://localhost:3000/photos");
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
  })
  .then(function (data) {
    addFragmentToTheContainer(sectionPictures, allPhotoFragment);
  })
  .catch((error) => {
    console.error(
      "Сталася страшна помилка під час отримання фотографій",
      error
    );
  });

export { photos, urlServ };

