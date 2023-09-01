const photoTemplate = document.querySelector("#picture");
const sectionPictures = document.querySelector(".pictures");
const allPhotoFragment = document.createDocumentFragment();

function getOnePhoto(el) {
  const copyTemplate = photoTemplate.content.cloneNode(true);
  const image = copyTemplate.querySelector(".picture__img");
  image.src = el.url;
  image.style.filter = `${el.metadata.filter}`
  image.style.transform = `${el.metadata.transform}`
  copyTemplate.querySelector(".picture__comments").textContent =
    el.comments.length;
  copyTemplate.querySelector(".picture__likes").textContent = el.likes;
  copyTemplate.querySelector(".picture").setAttribute("data-id", el.id);
  return copyTemplate;
}
function getAllPhoto(array) {
  array.forEach((el) => allPhotoFragment.appendChild(getOnePhoto(el)));
}

function clearImageSection(container, className) {
  const elementsToRemove = container.querySelectorAll(`.${className}`);
  elementsToRemove.forEach((element) => {
    element.remove();
  });
}

function addFragmentToTheContainer(container, fragment) {
  clearImageSection(container, 'picture')
  container.appendChild(fragment);
}

export { allPhotoFragment };
export { sectionPictures };
export { getAllPhoto };
export { addFragmentToTheContainer };
