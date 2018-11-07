/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
const createDivWithText = text => {
    const div = document.createElement('div');

    div.textContent = text;

    return div;
};

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в переметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) 
 */
const prepend = (what, where) => where.insertBefore(what, where.firstChild);

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом 
 которым является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span
  т.к. следующим соседом этих элементов является элемент с тегом P
 */
const findAllPSiblings = where => {
    const array = [];

    for (const child of where.children) {
        if (child.nextElementSibling && child.nextElementSibling.localName === 'p') {
            array.push(child);
        }
    }

    return array;
};

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла
 переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
const findError = where => {
    var array = [];

    for (var child of where.children) {
        array.push(child.textContent);
    }

    return array;
};

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
const deleteTextNodes = where => {
    for (const child of where.childNodes) {
        if (child.nodeType === 3) {
            child.textContent = '';
        }
    }
};

/*
 Задание 6:

 Выполнить предудыщее задание с использованием рекурсии - то есть необходимо заходить внутрь
каждого дочернего элемента (углубляться в дерево)

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
const deleteTextNodesRecursive = where => {
    for (const child of where.childNodes) {
        if (child.nodeType === 3) {
            child.textContent = '';
        }

        if (child.hasChildNodes()) {
            deleteTextNodesRecursive(child);
        }
    }
};

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
const collectDOMStat = (root, stat = { tags: {}, classes: {}, texts: 0 }) => {
    const walkTheDOM = where => {
        for (const child of where.childNodes) {
            if (child.nodeType === 3) {
                stat.texts++;
            }

            if (child.nodeType === 1) {
                if (stat.tags.hasOwnProperty(child.tagName)) {
                    stat.tags[child.tagName]++;
                } else {
                    stat.tags[child.tagName] = 1;
                }
            }

            if (child.classList) {
                for (const className of child.classList) {
                    // Check if class exist
                    if (stat.classes.hasOwnProperty(className)) {
                        // Start counting if it does
                        stat.classes[className]++;
                    } else {
                        // Set number of classes found to 1 if it doesnt
                        stat.classes[className] = 1;
                    }
                }
            }

            if (child.hasChildNodes()) {
                walkTheDOM(child);
            }
        }
    };

    walkTheDOM(root);

    return stat;
};

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
const observeChildNodes = (where, fn) => {
    const observer = new MutationObserver(mutationList => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                fn({ type: 'insert', nodes: [...mutation.addedNodes] });
            }

            if (mutation.removedNodes.length) {
                fn({ type: 'remove', nodes: [...mutation.removedNodes] });
            }
        }
    });

    const config = { childList: true };

    observer.observe(where, config);
};

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes,
};
