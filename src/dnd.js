/* Задание со звездочкой */

import { randomNumber } from '../helper';

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

const createDiv = () => {
    const div = document.createElement('div');

    div.classList.add('draggable-div');
    div.style.backgroundColor = `#${Math.round(0xffffff * Math.random()).toString(16)}`;
    div.style.position = 'absolute';
    div.style.top = `${randomNumber(1, 100)}%`;
    div.style.left = `${randomNumber(1, 100)}%`;
    div.style.width = `${randomNumber(5, 50)}%`;
    div.style.height = `${randomNumber(5, 50)}%`;

    return div;
};

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
const addListeners = target =>
    target.addEventListener('mousedown', evt => {
        let startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        const onMouseMove = moveEvt => {
            const shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            target.style.top = `${target.offsetTop - shift.y}px`;
            target.style.left = `${target.offsetLeft - shift.x}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', () => {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
