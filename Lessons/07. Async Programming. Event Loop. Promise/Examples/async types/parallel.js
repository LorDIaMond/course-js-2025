import fs from 'fs';

const state = [];

const logContent = () => {
    if (state.length !== 2) {
        return; // если добавлен только один файл, то выходим из функции
    }

    const text = state.join(', ');
    console.log(text);
};

// Читаем первый файл, добавляем его содержимое в data
fs.readFile('./files/one.txt', 'utf-8', (error, data) => {
    state.push(data);

    // Пытаемся вывести данные в консоль.
    // Если другой файл уже обработан, значит выполнение
    // всех асинхронных операций завершено
    logContent();
});

// Читаем второй файл, добавляем его содержимое в data
fs.readFile('./files/two.txt', 'utf-8', (error, data) => {
    state.push(data);

    // пытаемся вывести данные в консоль
    logContent();
});
