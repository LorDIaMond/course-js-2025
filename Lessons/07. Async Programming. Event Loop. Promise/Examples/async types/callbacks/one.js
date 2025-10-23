import fs from 'fs';

const callbackFunction = (error, data) => {
    // some code

    // error - ошибка, полученная при выполнении чтения файла
    console.log(error);

    // data - результат выполнения операции (содержимое файла в данном случае)
    console.log(data)
};

fs.readFile('../files/index.txt', 'utf-8', callbackFunction);

//
// const data = fs.readFile('../files/index', 'utf-8', callbackFunction);
// console.log(data); // undefined
