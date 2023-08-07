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


sectionPictures.addEventListener('click', (evt) => {
    const targetElement = evt.target;  
    const liComent = listOfComents.querySelectorAll('LI')
    for(let i = 0; i < liComent.length; i++) {
        liComent[i].remove()
    }
    body.classList.add('modal-open')
    sectionBigPicture.classList.remove('hidden')
    const linkClick =  targetElement.closest('[data-id]')
    if (linkClick) {
        const dataId = Number(linkClick.getAttribute('data-id'));
        console.log('Клікнуто на дочірній елемент для ссилки з data-id:', dataId);
        const photo = fotos.find((photo) => photo.id === dataId);
        if(photo) { 
            const arrComents = JSON.parse(JSON.stringify(photo.comments));
            console.log(arrComents, 'test')
            console.log('Знайдено ');
            createListComents(checkingTheNumberOfComments(arrComents), fragmentListComment, createLiComent)
            createFullSizePhoto(photo)
            addFragmentToTheContainer(listOfComents, fragmentListComment)  
    }else {
        console.log('Фото з id', dataId, 'не знайдено. Значення dataId:', dataId);
        console.log('Всі id з fotos:', fotos.map(photo => photo.id));
    }}
})

function createFullSizePhoto(photo) {
    bigIMG.querySelector('img').src = photo.url
    console.log(photo.url)
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
    array.forEach((el) => fragment.appendChild(callback(el)));
}
function checkingTheNumberOfComments(array) {
    const numberOfOutputComments = 5;
    if(array.length > numberOfOutputComments ) {
        array.splice(numberOfOutputComments, array.length - 5)
    }
    return array
}
// console.log(checkingTheNumberOfComments(fotos))

function closeFullscreenPhoto() {
    if(!sectionBigPicture.classList.contains('hidden')) {
        sectionBigPicture.classList.add('hidden')
        body.classList.remove('modal-open')
    } 
}
function pressKeyCancel(event) {
    if(!sectionBigPicture.classList.contains('hidden') && event.keyCode === 27) {
        sectionBigPicture.classList.add('hidden')
        body.classList.remove('modal-open')
    }
}

buttonCancel.addEventListener('click', closeFullscreenPhoto)
document.addEventListener('keydown', pressKeyCancel)

// Цікавинка))
// document.addEventListener('click', (evt) => {
//     const containerBigPictures = document.querySelector('.big-picture__preview');
//         console.log(containerBigPictures.classList)
//     if (!sectionBigPicture.classList.contains('hidden') && !containerBigPictures.contains(evt.target)) {
    
//         sectionBigPicture.classList.add('hidden');

//         document.body.classList.remove('modal-open');
//     }
// });