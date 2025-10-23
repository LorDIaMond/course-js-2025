import { promises } from 'fs';

const promiseOne = promises.readFile('../files/one.txt', 'utf-8');
const promiseTwo = promises.readFile('../files/two.txt', 'utf-8');

const promise = Promise.all([promiseOne, promiseTwo]);

promise.then(([dataOne, dataTwo]) => console.log(`${dataOne}${dataTwo}`));
