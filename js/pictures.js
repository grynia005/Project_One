import { fotos } from './main.js'
// console.log(fotos)

const photoTemplate = document.querySelector('#picture');
const sectionPictures = document.querySelector('.pictures');
const allPhotoFragment = document.createDocumentFragment();

function getOnePhoto(el) {
    const copyTemplate = photoTemplate.content.cloneNode(true);
    copyTemplate.querySelector('.picture__img').src = el.url;;
    copyTemplate.querySelector('.picture__comments').textContent = el.comments.length;
    copyTemplate.querySelector('.picture__likes').textContent = el.likes;
    copyTemplate.querySelector('.picture').setAttribute('data-id', el.id)
    return copyTemplate;
}
function getAllPhoto() {
    fotos.forEach((el) => allPhotoFragment.appendChild(getOnePhoto(el)));
}
getAllPhoto()
function addFragmentToTheContainer(container, fragment) {
    container.appendChild(fragment)
}
addFragmentToTheContainer(sectionPictures, allPhotoFragment);
export {addFragmentToTheContainer}
// export {sectionPictures}