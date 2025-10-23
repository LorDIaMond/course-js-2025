import fs from 'fs';

fs.readFile('../files/one.txt', 'utf-8', (errorOne, dataOne) => {
    fs.readFile('../files/two.txt', 'utf-8', (errorTwo, dataTwo) => {
        fs.readFile('../files/three.txt', 'utf-8', (errorThree, dataThree) => {
            console.log(`${dataOne}${dataTwo}${dataThree}`);
        });
    });
});
