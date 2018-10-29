/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
const forEach = (array, fn) => {
    for (let index = 0; index < array.length; index++) {
        fn(array[index], index, array);
    }
};

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
const map = (array, fn) => {
    const newArray = [];

    for (let index = 0; index < array.length; index++) {
        newArray.push(fn(array[index], index, array));
    }

    return newArray;
};
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
const reduce = (array, fn, initial = array[0]) => {
    const current = initial === array[0] ? 1 : 0;

    for (let index = current; index < array.length; index++) {
        initial = fn(initial, array[index], index, array);
    }

    return initial;
};

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
const upperProps = obj => {
    const array = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            array.push(key.toUpperCase());
        }
    }

    return array;
};

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
const slice = (array, from = 0, to = array.length) => {
    from = from >= 0 ? from : array.length + from;

    to = to >= 0 ? to : array.length + to;

    const newArray = [];

    for (let index = from; index < to; index++) {
        const element = array[index];

        if (element) {
            newArray.push(element);
        }
    }

    return newArray;
};

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
const createProxy = obj =>
    new Proxy(obj, {
        set(target, prop, value) {
            return (target[prop] = value *= value);
        }
    });

export { forEach, map, reduce, upperProps, slice, createProxy };
