const scaleValue = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const divImagePreview = document.querySelector('.img-upload__preview');
const testImage = divImagePreview.querySelector('IMG');

const sizeImage = {
    min: 0.25,
    max: 1
}

let initialValueScale = 1
const stepScale = 0.25;

function increasingSizeImage() {
    if( initialValueScale >= sizeImage.max) return
    initialValueScale += stepScale
    applyImageScale()
}

function reduceSizeImage () {
    if(initialValueScale <= sizeImage.min) return
    initialValueScale -= stepScale
    applyImageScale()
}

function applyImageScale() {
    testImage.style.transform = `scale(${initialValueScale})`
    scaleValue.value = `${initialValueScale*100}%`
}

applyImageScale()

buttonBigger.addEventListener('click', increasingSizeImage)

buttonSmaller.addEventListener('click', reduceSizeImage)

export { testImage }