import { fotos } from './main.js'
console.log(fotos)

const photoTemplate = document.querySelector('#picture');
const sectionPictures = document.querySelector('.pictures');
console.log(sectionPictures.tagName)
const allPhotoFragment = document.createDocumentFragment();

function getOnePhoto(el) {
    const copyTemplate = photoTemplate.content.cloneNode(true);
    const img = copyTemplate.querySelector('.picture__img');
    img.src = el.url;
    const numberOfComments = copyTemplate.querySelector('.picture__comments');
    const numberOfLikes = copyTemplate.querySelector('.picture__likes');
    numberOfComments.textContent = el.comments.length;
    numberOfLikes.textContent = el.likes;
    return copyTemplate;
}
function getAllPhoto() {
    fotos.forEach((el) => allPhotoFragment.appendChild(getOnePhoto(el)));
}
getAllPhoto()
sectionPictures.append(allPhotoFragment);