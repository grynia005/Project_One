import { body } from './fullScren.js'
// import { testImage } from './іmageEditing.js';
import { closeSlider } from './slider.js';
import { slider } from './slider.js';
import { originalImage } from './slider.js';


const alphanumericPattern = /^[a-zA-Z0-9]+$/;

const imageEditingForm = document.querySelector('.img-upload__overlay')
const imageForm = document.querySelector('.img-upload__form')
const inputUpload = document.querySelector('#upload-file')
const inputHashtags = document.querySelector('.text__hashtags')
const textareaComment = document.querySelector('.text__description')
const closestButton = document.querySelector('#upload-cancel')
const maxlengthComent = 140;
const maxlengthHashtags = 20;
const maxNumberHashtags = 5;

inputHashtags.required = false
textareaComment.required = false
// textareaComment.setAttribute('maxlength', lengthComent)

inputUpload.addEventListener('change', (evt) => {
    const uploadFile = evt.target.files[0]
    if(uploadFile) {
        imageEditingForm.classList.remove('hidden')
        body.classList.add('modal-open')
    }
})


document.querySelector('.img-upload__submit').addEventListener("click", function(event) {
    event.preventDefault();
    const hashtagsValid = validationOfHashtags(event)
    const commentValid = validationOfComent(event)
    if(hashtagsValid && commentValid) {
        console.log('Успішний успіх, форма відправлена))')
    }
})

function validationOfHashtags(event) {
    let enteredValueHTeg = inputHashtags.value
    const arrayValue = enteredValueHTeg.split(' ')
    return arrayСheck(arrayValue, inputHashtags)
}

function arrayСheck(array, input) {
    input.setCustomValidity('')
    console.log(array)
    let isValid = true
    array.forEach(element => {
        if(element !== '' && element[0] !== '#') {
            input.setCustomValidity('Тег має починатися з грат "#');
            isValid = false;
        } else if(element !== '' && element.length < 2) {
            input.setCustomValidity('Тег не може складатися лише з грат "#');
            isValid = false;
        } else if(element.length > maxlengthHashtags) {
            input.setCustomValidity('Тег не може складатися з більш ніж 20 символів включаючи грати "#');
            isValid = false;
        } else if( element !== '' && !alphanumericPattern.test(element.substring(1))) {
            input.setCustomValidity('Тег має складатися з літер і чисел і не може містити прогалини, спецсимволи (#, @, $ і т. п.), символи пунктуації (тире, дефіс, кома тощо), емодзі і т.д. ;')
            isValid = false;
        } 
    });

    if(!checkForDuplicates(array)) {
        input.setCustomValidity('Теги мають бути унікальними в незалежності від регістра');
        isValid = false;
    } else if(array.length > maxNumberHashtags) {
        input.setCustomValidity(`Максимальна кількість тегів не може складати більше ${maxNumberHashtags}`);
        isValid = false;
    } 

    input.reportValidity();
    return isValid
}
function checkForDuplicates(array) {
    const set = new Set(array.map((el) => el.toLowerCase()))
    return set.size === array.length
}


textareaComment.addEventListener('input', validationOfComent);

function validationOfComent() {
    let isValid = true
    let enteredValueComent = textareaComment.value
    if(enteredValueComent !== '' && enteredValueComent.length > maxlengthComent) {
        textareaComment.setCustomValidity('Коментар не може складатися з більше ніж 140 символів');
        isValid = false;
    } else {
        textareaComment.setCustomValidity('');
    }

    textareaComment.reportValidity();
    return isValid;
}

function closeForm() {
    if(!imageEditingForm.classList.contains('hidden')) {
        imageEditingForm.classList.add('hidden')
        body.classList.remove('modal-open')
        inputUpload.value = ''
    }
    closeSlider(slider)
    originalImage()

}

closestButton.addEventListener('click', closeForm)


document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !(document.activeElement === inputHashtags || document.activeElement === textareaComment)) closeForm()          
});