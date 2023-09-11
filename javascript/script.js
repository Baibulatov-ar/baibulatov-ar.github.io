const open_popup = document.querySelectorAll('.gallery__picture');
const left_button =  document.querySelector('.popup__left_button');
const right_button =  document.querySelector('.popup__right_button');
const imagePopup = document.querySelector('.gallery__popup')
function openGalleryPopup(evt) {
    evt.preventDefault();
    const picture = evt.currentTarget.closest('.gallery__picture');
    const popup = document.querySelector('.gallery__popup');
    popup.classList.remove('popup-closed');
    const popupImg = popup.querySelector('.popup-data__image');
    popupImg.src = picture.src;
    picture.classList.add('chosen');
    if (picture === open_popup[0]) {
        left_button.classList.add('without__button');
        right_button.classList.remove('without__button');
    } else if (picture === open_popup[2]) {
        right_button.classList.add('without__button');
        left_button.classList.remove('without__button');
    } else {
        left_button.classList.remove('without__button');
        right_button.classList.remove('without__button');
    }
}

left_button.addEventListener('click', () => {
    const image = document.querySelector('.chosen');
    image.classList.remove('chosen');
    const newImg = image.previousElementSibling;
    newImg.classList.add('chosen');
    const popupImg = document.querySelector('.popup-data__image');
    popupImg.src = newImg.src;

    if (newImg === open_popup[0]) {
        left_button.classList.add('without__button');
        right_button.classList.remove('without__button');
    } else if (newImg === open_popup[2]) {
        right_button.classList.add('without__button');
        left_button.classList.remove('without__button');
    } else {
        left_button.classList.remove('without__button');
        right_button.classList.remove('without__button');
    }
})

right_button.addEventListener('click', () => {
    const image = document.querySelector('.chosen');
    image.classList.remove('chosen');
    const newImg = image.nextElementSibling;
    newImg.classList.add('chosen');
    const popupImg = document.querySelector('.popup-data__image');
    popupImg.src = newImg.src;

    if (newImg === open_popup[0]) {
        left_button.classList.add('without__button');
        right_button.classList.remove('without__button');
    } else if (newImg === open_popup[2]) {
        right_button.classList.add('without__button');
        left_button.classList.remove('without__button');
    } else {
        left_button.classList.remove('without__button');
        right_button.classList.remove('without__button');
    }
})

for (let i = 0; i < open_popup.length; i++) {
    open_popup[i].addEventListener('click', openGalleryPopup);
}

function closeGalleryPopup(evt) {
    evt.preventDefault();
    const popup = document.querySelector('.gallery__popup');
    popup.classList.add('popup-closed');
}

const close_popup = document.querySelector('.popup__close_button');
close_popup.addEventListener('click', closeGalleryPopup);

imagePopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(imagePopup);
    }
})

function closePopup (cur_popup) {
    cur_popup.classList.add('popup-closed')
}

const feedback_form = document.querySelector('.form');
const feedback_button = document.querySelector('.buttons__feedback');
feedback_button.addEventListener('click', () => {
    feedback_form.classList.remove('popup-closed');
})
feedback_form.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(feedback_form);
    }
})


let timeoutPopupSeen = sessionStorage.getItem('popupDisplayed');
const timeoutPopup = document.querySelector('.random_popup');

if (timeoutPopupSeen !== 'true') {
    setTimeout(openTimeout, 30000);
}

function openTimeout() {
    timeoutPopup.classList.remove('popup-closed');
}

timeoutPopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        sessionStorage.setItem('popupDisplayed', 'true');
        closePopup(timeoutPopup); 
    }
})

const rainBtn = document.querySelector(".footer__rain-button");
let rain = document.querySelector(".rain");

rainBtn.addEventListener('click', function () {
    if (window.innerWidth >= 800) {
        rain.classList.add("rain_active");
        rain.classList.add("rain_animation");
    }
})

window.addEventListener('resize', function () {
    if (rain.classList.contains("rain_active")) {
        rain.classList.toggle("rain_animation");
    }
})

rain.addEventListener('click', function () {
    if (rain.classList.contains("rain_active")) {
        rain.classList.remove("rain_active");
    }
})

const textPatternEN = /[a-zA-Z]/;

const parameters = {
    formSelector: '.form__input-container',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__sending',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__form-text-input_type_error'
}

function incorrectEmail(inputElement) {
    const inputValue = inputElement.value.split(".");
    if (inputValue.length <= 1) {
        return true;
    }
    const emailEnd = inputValue.pop();
    return emailEnd.length < 2 || emailEnd.length > 6 || !(/[a-z]/i.test(emailEnd));
}

function incorrectTel(inputElement) {
    const inputValue = inputElement.value.split("+");
    const telEnd = inputValue.pop();
    return Number.isNaN(Number(telEnd)) || telEnd.length !== 11 || (inputValue.length === 1 && inputValue[0] !== "") || inputValue.length > 1;
}

function hasInvalidInput(inputsList) {
    return inputsList.some(function(inputElement) {
        return !inputElement.validity.valid || (inputElement.type === "email" && incorrectEmail(inputElement)) || (inputElement.type === "tel" && incorrectTel(inputElement)) || ((inputElement.id === "text-input" && (inputElement.value.search(textPatternEN) !== -1)));
    });
}

function toggleButton(inputsList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(Array.from(inputsList))) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else  {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    if (inputElement.type === "email" && incorrectEmail(inputElement)) {
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = "Некорректный email";
    }
    if ((inputElement.type === "tel" && incorrectTel(inputElement))) {
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = "Некорректный телефон";
    }
    if ((inputElement.id === "text-input" && (inputElement.value.search(textPatternEN) !== -1))) {
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = "Некорректный текст";
    }
}

function hideInputError(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
}

function enableValidation(parameters) {
    const formsList = document.querySelector(parameters.formSelector);
    formsList.addEventListener('submit', function (evt) {
            evt.preventDefault();
    });

        const inputsList = Array.from(formsList.querySelectorAll(parameters.inputSelector));
        const buttonElement = formsList.querySelector(parameters.submitButtonSelector);
        toggleButton(inputsList, buttonElement, parameters.inactiveButtonClass);
        inputsList.forEach(function(inputElement) {
            inputElement.addEventListener('input', function() {
                toggleButton(inputsList, buttonElement, parameters.inactiveButtonClass);
                if (!inputElement.validity.valid || (inputElement.type === "email" && incorrectEmail(inputElement)) || (inputElement.type === "tel" && incorrectTel(inputElement)) || (inputElement.id === "text-input" && (inputElement.value.search(textPatternEN) !== -1))) {
                    showInputError(formsList, inputElement, inputElement.validationMessage, parameters.inputErrorClass);
                } else {
                    hideInputError(formsList, inputElement, parameters.inputErrorClass);
                }
            })
        });
}

enableValidation(parameters);

function showLoading() {
    document.querySelector(parameters.submitButtonSelector).textContent = "Отправляется..."
}

function success() {
    document.querySelector(parameters.submitButtonSelector).textContent = "Успешная отправка!"
}

function hideLoading() {
    document.querySelector(parameters.submitButtonSelector).textContent = "Отправить"
}

document.querySelector(parameters.formSelector).addEventListener('submit', function() {
    const popupForm = document.querySelector(parameters.formSelector);
    const telInput = popupForm.querySelector(".form__number");
    const emailInput = popupForm.querySelector(".form__email");
    const textInput = popupForm.querySelector(".form__text");
    showLoading();
    fetch("", {
        method: "POST",
        body: JSON.stringify({
            tel: telInput.value,
            email: emailInput.value,
            text: textInput.value
        })
    })
        .then(function() {
            setTimeout(success, 500);
            setTimeout(function () {
                closePopup(document.querySelector('.form-popup'));
                hideLoading()
            }, 1000);
        })
        .catch(function (err) {
            console.log(err);
        })
})

const themeBtn = document.querySelector(".buttons__theme");


themeBtn.addEventListener('click', function () {
    document.querySelector('.header').classList.toggle('header_theme_black');
    document.querySelector('.header__text').classList.toggle('text_theme_black');
    document.querySelector('.main').classList.toggle('main_theme_black');
    document.querySelector('.work-and-studying__education').classList.toggle('text_theme_black');
    document.querySelector('.work-and-studying__education-places').classList.toggle('text_theme_black');
    document.querySelector('.work-and-studying__skills').classList.toggle('text_theme_black');
    document.querySelector('.work-and-studying__skills-list').classList.toggle('text_theme_black');
    document.querySelector('.interests').classList.toggle('text_theme_black');
    document.querySelector('.interests__list').classList.toggle('text_theme_black');
    document.querySelector('.map').classList.toggle('map_black_theme');
    document.querySelector('.map__text').classList.toggle('text_theme_black');
    document.querySelector('.telephone-link').classList.toggle('telephone-link_black_theme');
    document.querySelector('.mail-link').classList.toggle('mail-link_black_theme');
    document.querySelector('.gallery').classList.toggle('gallery_black_theme');
    document.querySelector('.gallery__subtitle').classList.toggle('text_theme_black');
    document.querySelector('.footer').classList.toggle('footer_black_theme');
    document.querySelector('.map__interactive').classList.toggle('map__interactive_black_theme');
})