/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствущее фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующие cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// форма "добавить cookie"
const addBlock = homeworkContainer.querySelector('#add-block');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', () => {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    renderCookies();
});

addBlock.addEventListener('submit', evt => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    evt.preventDefault();
    const name = evt.target.elements.name.value.trim();
    const value = evt.target.elements.value.value.trim();

    setCookie(name, value);
    renderCookies();
});

const getCookies = () => document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');

    prev[name] = value;

    return prev;
}, {});

const setCookie = (name, value, days = 7) => {
    // return if no value provided
    if (!name || !value) {
        return;
    }

    const date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    const expires = `expires=${date.toGMTString()}`;

    document.cookie = `${name}=${value};${expires};`;
};

// get the dom element for an individual cookie
const generateCookiesDOM = (name, value) => {
    const containerEl = document.createElement('tr');
    const nameEl = document.createElement('td');
    const valueEl = document.createElement('td');
    const removeEl = document.createElement('td');
    const removeButton = document.createElement('button');

    // setup name
    nameEl.textContent = name;
    containerEl.appendChild(nameEl);

    // setup value
    valueEl.textContent = value;
    containerEl.appendChild(valueEl);

    // setup button
    containerEl.appendChild(removeEl);
    removeButton.textContent = 'X';
    removeEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        setCookie(name, value, -1);
        renderCookies();
    });

    return containerEl;
};

const filterCookies = fullName => fullName.toLowerCase().includes(filterNameInput.value.toLowerCase());

const renderCookies = () => {
    const cookies = getCookies();

    const filteredCookies = {};

    // filter cookies based on filter
    for (const name in cookies) {
        if (name && cookies.hasOwnProperty(name)) {
            const value = cookies[name];

            if (filterCookies(name) || filterCookies(value)) {
                filteredCookies[name] = value;
            }
        }
    }

    listTable.innerHTML = '';

    // render element for each cookie
    if (Object.keys(filteredCookies).length) {
        for (const name in filteredCookies) {
            if (filteredCookies.hasOwnProperty(name)) {
                listTable.appendChild(generateCookiesDOM(name, filteredCookies[name]));
            }
        }
    }
};

renderCookies();
