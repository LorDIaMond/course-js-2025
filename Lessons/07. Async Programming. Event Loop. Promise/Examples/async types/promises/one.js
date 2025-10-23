import { promises } from 'fs';

promises
    .readFile('../files/one.txt', 'utf-8')
    .then((dataOne) => {
        console.log(dataOne);
    });

console.log(promises.readFile('../files/one.txt', 'utf-8'));
