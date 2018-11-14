/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
const delayPromise = seconds => new Promise(resolve => {
    setTimeout(() => {
        resolve('done');
    }, `${seconds}000`);
});

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */

const loadAndSortTowns = async () => {
    const response = await fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');

    if (response.ok) {
        const data = await response.json();

        data.sort((a, b) => a.name.localeCompare(b.name));

        return data;
    }

    throw new Error('unable to get towns');
};

export { delayPromise, loadAndSortTowns };
