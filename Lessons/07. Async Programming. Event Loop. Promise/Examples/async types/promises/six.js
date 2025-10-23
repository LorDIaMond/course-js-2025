// Другие способы создания промисов

const promiseOne = Promise.resolve();  // промис, который завершится с успехом
// promiseOne.then((data) => ...

const promiseTwo = Promise.reject();   // промис, который завершится с неудачей
// promiseTwo.catch((error) => ...
