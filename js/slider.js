import { testImage } from "./іmageEditing.js";

const slider = document.querySelector("#slider");
const effctLevelValue = document.querySelector(".effect-level__value");
const effectsList = document.querySelector(".effects__list");
const effectRadio = effectsList.querySelectorAll(".effects__radio");
const effectLevelBox = document.querySelector(".effect-level");
const effects = {
  chrome: {
    start: [1],
    step: 0.1,
    connect: "lower",
    range: {
      min: 0,
      max: 1,
    },
    filter: "grayscale",
    units: "",
  },
  sepia: {
    start: [1],
    step: 0.1,
    connect: "lower",
    range: {
      min: 0,
      max: 1,
    },
    filter: "sepia",
    units: "",
  },
  marvin: {
    start: [100],
    step: 1,
    connect: "lower",
    range: {
      min: 0,
      max: 100,
    },
    filter: "invert",
    units: "%",
  },
  phobos: {
    start: [3],
    step: 0.1,
    connect: "lower",
    range: {
      min: 0,
      max: 3,
    },
    filter: "blur",
    units: "px",
  },
  heat: {
    start: [3],
    step: 0.1,
    connect: "lower",
    range: {
      min: 1,
      max: 3,
    },
    filter: "brightness",
    units: "",
  },
};



function addEffect(effectName) {
  testImage.className = "";
  testImage.style.filter = "none";
  testImage.classList.add(`effects__preview-${effectName}`);
}

function imageСhange(value, handle, filter, units) {
  const effectLevel = value[handle];
  effctLevelValue.value = effectLevel;
  testImage.style.filter = `${filter}(${effectLevel + units})`;
}

function originalImage() {
  testImage.className = "";
  testImage.style.filter = "none";
  testImage.style.transform = 'scale(1)'
}

function createSlider(evt) {
  effectLevelBox.classList.remove("hidden");
  closeSlider(slider);
  const targetEllement = evt.target;
  const effectName = targetEllement.value;
  console.log(effectName);
  let sliderConfig = null;
  

  switch (effectName) {
    case "chrome":
    case "sepia":
    case "marvin":
    case "phobos":
    case "heat":
      sliderConfig = effects[effectName];
      addEffect(effectName);
      noUiSlider.create(slider, sliderConfig);
      slider.noUiSlider.on("update", function (value, handle) {
        imageСhange(value, handle, sliderConfig.filter, sliderConfig.units);
      });
      break;
    default:
      closeSlider(slider);
      originalImage();
      break;
  }
}

function closeSlider(slider) {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
}

effectsList.addEventListener("change", createSlider);

export { slider };
export { closeSlider };
export { originalImage };import { testImage } from "./іmageEditing.js";

const slider = document.querySelector("#slider");
const effctLevelValue = document.querySelector(".effect-level__value");
const effectsList = document.querySelector(".effects__list");
const effectRadio = effectsList.querySelectorAll(".effects__radio");
const effectLevelBox = document.querySelector(".effect-level");
const effects = {
  chrome: {
    start: [1],
    step: 0.1,
    connect: "lower",
    range: {
      min: 0,
      max: 1,
    },
    filter: "grayscale",
    units: "",
  },
  sepia: {
    start: [1],
    step: 0.1,
    connect: "lower",
    range: {
      min: 0,
      max: 1,
    },
    filter: "sepia",
    units: "",
  },
  marvin: {
    start: [100],
    step: 1,
    connect: "lower",
    range: {
      min: 0,
      max: 100,
    },
    filter: "invert",
    units: "%",
  },
  phobos: {
    start: [3],
    step: 0.1,
    connect: "lower",
    range: {
      min: 0,
      max: 3,
    },
    filter: "blur",
    units: "px",
  },
  heat: {
    start: [3],
    step: 0.1,
    connect: "lower",
    range: {
      min: 1,
      max: 3,
    },
    filter: "brightness",
    units: "",
  },
};

function addEffect(effectName) {
  testImage.className = "";
  testImage.style.filter = "none";
  testImage.classList.add(`effects__preview-${effectName}`);
}

function imageСhange(value, handle, filter, units) {
  const effectLevel = value[handle];
  effctLevelValue.value = effectLevel;
  testImage.style.filter = `${filter}(${effectLevel + units})`;
}

function originalImage() {
  testImage.className = "";
  testImage.style.filter = "none";
}

function createSlider(evt) {
  effectLevelBox.classList.remove("hidden");
  closeSlider(slider);
  const targetEllement = evt.target;
  const effectName = targetEllement.value;
  console.log(effectName);
  let sliderConfig = null;


  switch (targetEllement.value) {
    case "chrome":
    case "sepia":
    case "marvin":
    case "phobos":
    case "heat":
      sliderConfig = effects[targetEllement.value];
      addEffect(targetEllement.value);
      noUiSlider.create(slider, sliderConfig);
      slider.noUiSlider.on("update", function (value, handle) {
        imageСhange(value, handle, sliderConfig.filter, sliderConfig.units);
      });
      break;
    default:
      closeSlider(slider);
      originalImage();
      break;
  }
}

function closeSlider(slider) {
  if (slider.noUiSlider && slider.noUiSlider.get()) {
    slider.noUiSlider.destroy();
  }
}

effectsList.addEventListener("change", createSlider);

export { slider };
export { closeSlider };
export { originalImage };