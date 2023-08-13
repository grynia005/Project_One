import { fotos } from './main.js'
import { addFragmentToTheContainer } from './pictures.js'
// import { sectionPictures } from './pictures.js'

const sectionPictures = document.querySelector('.pictures')
const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureSocial = sectionBigPicture.querySelector('.big-picture__social')
const bigIMG = sectionBigPicture.querySelector('.big-picture__img');
const socialHeader = sectionBigPicture.querySelector('.social__header')
const comentTemplate = document.querySelector('#social__comment')
const listOfComents = sectionBigPicture.querySelector('.social__comments')  
const fragmentListComment = document.createDocumentFragment()
const buttonCancel = sectionBigPicture.querySelector('.big-picture__cancel')
const body = document.querySelector('body')
export {body}


sectionPictures.addEventListener('click', (evt) => {
    const targetElement = evt.target;  
    const liComent = listOfComents.querySelectorAll('LI')
    for(let i = 0; i < liComent.length; i++) {
        liComent[i].remove()
    }
    body.classList.add('modal-open')
    const linkClick =  targetElement.closest('[data-id]')
    const dataId = Number(linkClick.getAttribute('data-id'))
    const photo = fotos.find((photo) => photo.id === dataId)
    if(photo) { 
        sectionBigPicture.classList.remove('hidden')
        const arrComents = JSON.parse(JSON.stringify(photo.comments));
        createListComents(arrComents, fragmentListComment, createLiComent)        
        createFullSizePhoto(photo)
        addFragmentToTheContainer(listOfComents, fragmentListComment);
    }
});


function createFullSizePhoto(photo) {
    bigIMG.querySelector('img').src = photo.url
    // console.log(photo.url)
    bigIMG.querySelector('img').setAttribute('alt', photo.decription)
    socialHeader.querySelector('img').src = photo.url // тут може бути Ваша фотографія))
    socialHeader.querySelector('.social__caption').textContent = photo.decription
    socialHeader.querySelector('.likes-count').textContent = photo.likes
}

function createLiComent(el) {
    const copyTemplate = comentTemplate.content.cloneNode(true);
    copyTemplate.querySelector('.social__picture').src = el.avatar
    copyTemplate.querySelector('.social__author').textContent = el.name
    copyTemplate.querySelector('.social__text').textContent = el.message
    return copyTemplate

}
function createListComents(array, fragment, callback) {
    const coments = checkingTheNumberOfComments(array)
    coments.forEach((el) => fragment.appendChild(callback(el)));
}
function checkingTheNumberOfComments(array) {
    const numberOfOutputComments = 5;
    array.splice(numberOfOutputComments, array.length - 5)
    return array 
};

function closeFullscreenPhoto() {
    if(!sectionBigPicture.classList.contains('hidden')) {
        sectionBigPicture.classList.add('hidden')
        body.classList.remove('modal-open')
    } 
};

buttonCancel.addEventListener('click', closeFullscreenPhoto)
document.addEventListener('keydown', (evt) => {
    console.log(evt.key)
    if(evt.key === 'Escape') {
        closeFullscreenPhoto()
    }
});

// Цікавинка))
// document.addEventListener('click', (evt) => {
//     const containerBigPictures = document.querySelector('.big-picture__preview');
//     // console.log(containerBigPictures.classList)
//     console.log(evt.target.classList)

//     if (!containerBigPictures.contains(evt.target) && sectionBigPicture.classList.contains('hidden')) {
    
//         sectionBigPicture.classList.add('hidden');

//         document.body.classList.remove('modal-open');
//     }
// });