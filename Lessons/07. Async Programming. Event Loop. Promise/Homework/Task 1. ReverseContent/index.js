import {promises as fs} from 'fs';
import path from 'path';


// Метод для отладки. В итоговом решении использоваться не должен
const getPath = (fileName) => path.join(__dirname, './__fixtures__', fileName);
// Пример использования метода
// const currentPath = getPath('/one.txt');

const reverseData = (data) => {
    return data.split('\n').reverse().join('\n');
}

const reverseContent = (filepath) => {
    return fs.readFile(filepath, 'utf8')
        .then(text => {
            const reversedText = reverseData(text);
            return fs.writeFile(filepath, reversedText, 'utf8')
                .then(() => reversedText);
        });
};

export default reverseContent;