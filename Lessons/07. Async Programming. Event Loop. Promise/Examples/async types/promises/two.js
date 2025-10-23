import { promises } from 'fs';

// const bestPromiseEver = new Promise((resolveCallback, rejectCallback) => {
//     resolveCallback(result);
//     rejectCallback(error);
// });

// Использование промиса
// bestPromiseEver.then(onFulfilled, onRejected)

// Пример:
promises
    .readFile('./files/one', 'utf-8')
    .then(
        // Функция onFulfilled:
        (result) => {
            console.log(result);
        },
        // Функция onRejected:
        (error) => {
            console.log(error);
        },
    );
