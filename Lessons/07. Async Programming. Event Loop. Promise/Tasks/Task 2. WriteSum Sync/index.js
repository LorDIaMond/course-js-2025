import fs from 'fs';
import path from 'path';

// Метод для отладки. В итоговом решении использоваться не должен
const getPath = (fileName) => path.join(__dirname, './__fixtures__', fileName);
// Пример использования функции
// const currentPath = getPath('/one.txt');

const getSum = (content) => {
    if (!content.trim()) return 0;
    return content
        .split(',')
        .filter(part => part !== '')
        .map(Number)
        .reduce((sum, num) => sum + num, 0);
};

const writeSumSync = (pathToFileOne, pathToFileTwo, pathToResultFile) => {
    const file1 = fs.readFileSync(pathToFileOne, 'utf-8');
    const file2 = fs.readFileSync(pathToFileTwo, 'utf-8');

    let sum1 = getSum(file1);
    let sum2 = getSum(file2);

    let result = sum1+sum2;

    fs.writeFileSync(pathToResultFile, String(result), 'utf-8');
};

export default writeSumSync;
