/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
let towns = [];
/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
const loadTowns = async () => {
    const response = await fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');

    if (response.ok) {
        const data = await response.json();

        data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }

            return 0;
        });

        filterBlock.style.display = '';
        loadingBlock.textContent = '';

        towns = data;

        return data;
    }
    // При ошибке
    const retryButton = document.createElement('button');

    retryButton.textContent = 'Повторить';

    homeworkContainer.appendChild(retryButton);

    loadingBlock.textContent = 'Не удалось загрузить города';

    const onRetry = () => {
        loadingBlock.textContent = 'Загрузка...';
        loadTowns();
        homeworkContainer.removeChild(retryButton);
    };

    retryButton.addEventListener('click', onRetry);

    throw new Error('unable to get towns');
};

loadTowns();

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
const isMatching = (full, chunk) => full.toLowerCase().includes(chunk.toLowerCase());

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

// это обработчик нажатия клавиш в текстовом поле
filterInput.addEventListener('keyup', evt => {
    filterResult.innerHTML = towns
        .filter(town => isMatching(town.name, evt.target.value))
        .map(town => (evt.target.value.length ? `<p>${town.name}</p>` : ''))
        .join('');
});

export { loadTowns, isMatching };
