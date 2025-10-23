import fs from 'fs';

const newPromise = new Promise((resolve, reject) => {
    // resolve - коллбек, вызываемый при успешком выполнении операции
    // reject - коллбек, вызываемый при появлении ошибок в процессе выполнения операции
    fs.readdir('../files', (error, data) => {
        if (error) {
            reject(error);
            return;
        }

        resolve(data);
    });
});

newPromise.then(data => console.log(data));
