import assert from 'assert';
import { delayPromise, loadAndSortTowns } from '../src/index';

describe('ДЗ 6.1 - Асинхронность и работа с сетью', () => {
    describe('delayPromise', () => {
        it('должна возвращать Promise', () => {
            const result = delayPromise(1);

            assert(result instanceof Promise);
        });

        it('Promise должен быть resolved через указанное количество секунд', done => {
            const result = delayPromise(1);
            const startTime = new Date();

            result
                .then(() => {
                    assert(new Date() - startTime >= 1000);
                    done();
                })
                .catch(done);
        });
    });

    describe('loadAndSortTowns', () => {
        it('должна возвращать Promise', () => {
            const result = loadAndSortTowns();

            // в FF + babel есть проблема при проверке instanceof Promise
            // поэтому приходится проверять так
            assert.equal(result.constructor.name, 'Promise');
            assert.equal(typeof result.then, 'function');
            assert.equal(typeof result.catch, 'function');
        });

        it('Promise должен разрешаться массивом из городов', done => {
            /* eslint-disable max-nested-callbacks */
            const result = loadAndSortTowns();

            result
                .then(towns => {
                    assert(Array.isArray(towns), 'должен быть массивом');
                    assert(towns.length == 50, 'неверный размер массива');
                    towns.forEach((town, i, towns) => {
                        assert(town.hasOwnProperty('name'), 'город должен иметь свойтво name');

                        if (i) {
                            assert(towns[i - 1].name < town.name, 'города должны быть отсортированы');
                        }
                    });
                    done();
                })
                .catch(done);
            /* eslint-enable */
        });
    });
});
