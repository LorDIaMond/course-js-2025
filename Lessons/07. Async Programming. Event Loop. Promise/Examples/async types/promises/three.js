import { promises } from 'fs';

promises.readFile('../files/one.txt', 'utf-8')
    .then(
        (dataOne) => console.log(dataOne),
    )
    .then(
        () => promises.readFile('../files/two.txt', 'utf-8'),
    )
    .then(
        (dataTwo) => console.log(dataTwo),
    )
    .then(
        () => promises.readFile('../files/three.txt', 'utf-8'),
    )
    .then(
        (dataThree) => console.log(dataThree),
    );
