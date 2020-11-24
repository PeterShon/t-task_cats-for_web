//плавный скролл полифилл by https://nicegist.github.io/d210786daa23fd57db59634dd231f341
var nativeSmoothScrollTo = function (a) { window.scroll({ behavior: "smooth", left: 0, top: a.getBoundingClientRect().top + window.pageYOffset }) }, smoothScrollTo = function (a, f) { var c = document.scrollingElement || document.documentElement, d = c.scrollTop, g = a - d, k = +new Date, h = function (e) { e = +new Date - k; var l = parseInt; var b = e / (f / 2); 1 > b ? b = g / 2 * b * b + d : (b--, b = -g / 2 * (b * (b - 2) - 1) + d); c.scrollTop = l(b); e < f ? requestAnimationFrame(h) : c.scrollTop = a }; h() }, supportsNativeSmoothScroll = "scrollBehavior" in document.documentElement.style,
   scrollToElem = function (a) { a && (a = document.querySelector(a)) && (supportsNativeSmoothScroll ? nativeSmoothScrollTo(a) : smoothScrollTo(a.offsetTop, 600)) };;

document.addEventListener('DOMContentLoaded', function () {
   ////валидация формы и отображение чекбоксов
   //объявление переменных/констант
const feedbackSub = document.querySelector('.feedback__btn');
const form = document.getElementById('form');

//добавление функции валидации событию "клик" для кнопки
feedbackSub.addEventListener('click', validateUp);

//вызов функции обработки checkbox по клику
chbLb();

//объявление функции валидации формы
function formValidate() {
   let error = 0;
   let formReq = document.querySelectorAll('.__req') //require - обязательное поле //создаёт объект со всеми элементами с классом обязательности
   //присвоение каждому обязательному объекту определённого результата
   for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input); //в начале проверки объектов убрать у всех объектов класс '__error'
      //проверка на присутствие класса '__email' у объекта
      if (input.classList.contains('__email')) {
         //если объект имеет ошибку в тексте email, то ему добавляется класс '__error'
         if (emailTest(input)) {
            formAddError(input);
            error++;
         }
      } else {
         //проверка заполненности оставшегося поля
         if (input.checked == false) {
            formAddError(input);
            error++;
         }
      }
   }
   return error;
};

//функции добавляют/убирают класс '__error' себе и родительскому объету
function formAddError(input) {
   //input.parentElement.classList.add('__error');
   input.classList.add('__error');
};
function formRemoveError(input) {
   //input.parentElement.classList.remove('__error');
   input.classList.remove('__error');
};
//Функция теста email
function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

//Функция запуска валидации
function validateUp(form) {
   if (formValidate(form)) {
      alert('Пожалуйста заполните поле Email и укажите согласие на подписку');
      return console.log('Отправка формы остановлена'); //не обновлять страницу, если есть ошибки
   } else {
      alert('Спасибо. Ваша подписка оформлена')
   }
}

//Функция применения события click для всех checkbox внутри формы 
function chbLb() {
   let formReq = document.querySelectorAll('.feedback__chb');
   for (let i = 0; i < formReq.length; i++) {
      formReq[i].addEventListener('click', function () {
         this.classList.toggle('feedback__chb--active');
      });
   }
}
   ////scrollUp
   //результат проверки нативной поддержки плавного скролла (ie11)
const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
//получение объектов
var moveUpItem = document.querySelector('.main__arrowtop');
//вызов функции, добавляющей функции в объект
setFunc(moveUpItem);
//вызов функции оценки положения окна при загрузке старицы, для отображения/скрытия скролл-кнопки
lvlScroll();
//обработка события onScroll
window.addEventListener('scroll', lvlScroll)
//обработка события onClick
moveUpItem.addEventListener('click', function () {
   if (supportsNativeSmoothScroll) {
      //обработка кода по условию "если есть скролл"
      if (window.pageYOffset) {
         window.scrollTo({ top: 0, behavior: 'smooth' })
      }
   } else {
      if (window.pageYOffset) {
         scrollToElem('#header');
      }
   }
})

//изменение статуса объекта
function fz_hider() {
   this.classList.add('_transparent');
}
function fz_shower() {
   this.classList.remove('_transparent');
}
//запись функций в каждый анимируемый объект
function setFunc(moveUpItem) {
   moveUpItem.hider = fz_hider;
   moveUpItem.shower = fz_shower;
}

//функция, определяющая статус объектов по высоте скролла
function lvlScroll() {
   /*console.log('Документ: ');
   console.log(document);
   console.log('Окно: ');
   console.log(window);
   console.log('Ширина окна: ' + document.documentElement.clientWidth);
   console.log('Текущий скролл: ' + window.pageYOffset);*/
   if (document.documentElement.clientWidth * 0.105 > window.pageYOffset) {
      moveUpItem.hider();
   } else {
      moveUpItem.shower();
   }
}
   ////burger
   
let nav = document.querySelector('.header__nav');
let bodyofpage = document.querySelector('body');
let burgerItem = document.querySelector('.__burger');
burgerItem.addEventListener('click', burgerStateShow);

function burgerStateShow() {
   if (window.matchMedia("(max-width: 800px)").matches) {
      if (!nav.classList.contains('__active')) {
         nav.classList.add('__active');
         document.body.style.overflow = 'hidden';
      } else {
         nav.classList.remove('__active');
         document.body.style.overflow = 'visible';
      }
   }
}
   ////modal
   let favorites = document.querySelectorAll('.card__widg-like-wrap');
//вызов функции присвоения функции к каждому элементу по событию 'click'
funcOfFavorite(favorites);

//функция вызова функции проверки лайка по событию 'click'
function funcOfFavorite(array_favorite) {
   for (let i = 0; i < array_favorite.length; i++) {
      array_favorite[i].addEventListener('click', checkFavorite);
   }
}

//Функция проверки лайка на элементе
function checkFavorite() {
   if (this.classList.contains('card__widg-like-wrap--active')) {
      this.classList.remove('card__widg-like-wrap--active');
      this.querySelector('.card__favorite').href = "#close";
   } else {
      this.classList.add('card__widg-like-wrap--active');
      this.querySelector('.card__favorite').href = "#openModal";
   }
}
   ////showcards
   let showButton = document.querySelector('.cards__show-block'); //кнопка
let cardbox = document.querySelector('.cards__card-box'); //бокс с карточками
let hidecards = cardbox.getElementsByClassName('card--hide'); //список курточек, узлов DOM
const firstshow = 6; //сколько карточек показать вначале
const countToShow = showButton.dataset.n; //карточек к показу

//показать начальное количество карточек
if (hidecards.length < 6) {
   for (let i = 0; i < hidecards.length; i++) {
      hidecards[0].classList.add('card--active');
      hidecards[0].classList.remove('card--hide');
   }
} else {
   for (let i = 0; i < firstshow; i++) {
      hidecards[0].classList.add('card--active');
      hidecards[0].classList.remove('card--hide');
   }
}

//передача событию 'click' для кнопки анонимную функцию вызывающую фунцию показа карточек
showButton.addEventListener('click', function () {
   showcards(hidecards);
   if (document.querySelector('.sort__item--active') == null) {
      return
   } else if (document.querySelector('.sort__item--active').classList.contains('sort__age')) {
      sortByAge(cardBox, cards, visiblecards);
   } else if (document.querySelector('.sort__item--active').classList.contains('sort__price')) {
      sortByPrice(cardBox, cards, visiblecards);
   }
})

//функция показа карточек
function showcards(arrayOfCards) {
   if (arrayOfCards.length < countToShow) {
      for (let i = 0; i < arrayOfCards.length; i++) {
         arrayOfCards[0].classList.add('card--active');
         arrayOfCards[0].classList.remove('card--hide');
      }
      if (arrayOfCards.length == 0) {
         showButton.classList.add('_hide');
      }
   } else {
      for (let i = 0; i < countToShow; i++) {
         arrayOfCards[0].classList.add('card--active');
         arrayOfCards[0].classList.remove('card--hide');
      }
      if (arrayOfCards.length == 0) {
         showButton.classList.add('_hide');
      }
   }
}
   ////salewidget
   let salewidgetsArray = cardbox.getElementsByClassName('card__widg-sale'); //список скидочных виджетов, узлов DOM
//скрыть виджет, если дата-атрибут пуст
for (let i = 0; i < salewidgetsArray.length; i++) {
   if (salewidgetsArray[i].dataset.percent == "") {
      salewidgetsArray[i].classList.add('_transparent');
   }
}
   ////bought
   let boughtCats = cardbox.getElementsByClassName('card__btn'); //список кнопок карточек, узлов DOM
//определение стиля кнопки
for (let i = 0; i < boughtCats.length; i++) {
   if (boughtCats[i].dataset.btn == "Продан") {
      boughtCats[i].classList.add('card__btn--bought');
   } else {
      boughtCats[i].classList.add('card__btn--buy');
   }
}
   ////sort
   let visiblecards = document.getElementsByClassName('card--active'); //список активных карточек, узлов DOM
let cardBox = document.getElementById('cards__card-box'); //родитель карточек
let cards = document.getElementById('cards__card-box').children; //карточки
const sortButtonPrice = document.querySelector('.sort__price');
const sortButtonAge = document.querySelector('.sort__age');
//определение атрибутов цены и возраста для видимых карточек
setPrice(visiblecards);
setAge(visiblecards);

//определение вызова функций сортировки для кнопки по событию 'click', а так же стилизация этой кнопки
sortButtonPrice.addEventListener('click', function () {
   sortByPrice(cardBox, cards, visiblecards);
   this.classList.add('sort__item--active');
   sortButtonAge.classList.remove('sort__item--active');
});
sortButtonAge.addEventListener('click', function () {
   sortByAge(cardBox, cards, visiblecards);
   this.classList.add('sort__item--active');
   sortButtonPrice.classList.remove('sort__item--active');
});

//функция определения свойства цены карточке
function setPrice(cards) {
   for (let i = 0; i < cards.length; i++) {
      cards[i].cPrice = cards[i].querySelector('.card__price').dataset.price.replace(' ', '') * 1;
   }
}
//функция определения свойства возвраста карточке
function setAge(cards) {
   for (let i = 0; i < cards.length; i++) {
      cards[i].cAge = cards[i].querySelector('.card__age').dataset.itemD * 1;
   }
}
//функция сортировки по цене
function sortByPrice(cardsNod, cardsArr, visCards) {
   setPrice(visCards);
   [].slice.call(cardsArr).sort(function (a, b) {
      if (a.cPrice < b.cPrice) {
         return -1;
      } else if (a.cPrice > b.cPrice) {
         return 1;
      } else {
         return 0;
      }
   }).forEach(function (val, index) {
      cardsNod.appendChild(val);
   });
}
//функция сортировки по возрасту
function sortByAge(cardsNod, cardsArr, visCards) {
   setAge(visCards);
   [].slice.call(cardsArr).sort(function (a, b) {
      if (a.cAge < b.cAge) {
         return -1;
      } else if (a.cAge > b.cAge) {
         return 1;
      } else {
         return 0;
      }
   }).forEach(function (val, index) {
      cardsNod.appendChild(val);
   });
}
});