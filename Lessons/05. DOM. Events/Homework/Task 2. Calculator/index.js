const TYPES = {
    DIGIT: 'digit',
    PLUS: 'plus',
    RESULT: 'result',
    RESET: 'reset',
};

const ADDITIONAL_BUTTONS = [
    {
        text: '+',
        type: TYPES.PLUS,
    },
    {
        text: '=',
        type: TYPES.RESULT,
    },
    {
        text: 'Сбросить',
        type: TYPES.RESET,
    },
];

const setCalculator = () => {
    let expression = ''; // текущее выражение
    let result = 0;      // результат

    const buttonsContainer = document.querySelector('.calc__buttons');
    const resultContainer = document.querySelector('.calc__result');
    const mainDisplay = document.querySelector('.calc__main');

    for (let i = 0; i <= 9; i++) {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-dark');
        button.dataset.type = TYPES.DIGIT;
        button.textContent = i;
        buttonsContainer.appendChild(button);
    }

    ADDITIONAL_BUTTONS.forEach(btnConfig => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-dark');
        button.dataset.type = btnConfig.type;
        button.textContent = btnConfig.text;
        buttonsContainer.appendChild(button);
    });

    const resultLabel = document.createElement('span');
    resultLabel.textContent = 'Результат:';

    const resultNumber = document.createElement('span');
    resultNumber.classList.add('calc__result-number');
    resultNumber.textContent = '0';

    resultContainer.appendChild(resultLabel);
    resultContainer.appendChild(resultNumber);

    const calculateResult = () => {
        if (!expression) return 0;

        const numbers = expression.split('+').map(num => parseInt(num) || 0);
        return numbers.reduce((sum, num) => sum + num, 0);
    };

    const updateDisplay = () => {
        mainDisplay.textContent = expression;
        resultNumber.textContent = result;
    };

    buttonsContainer.addEventListener('click', (event) => {
        if (!event.target.matches('button')) return;

        const type = event.target.dataset.type;
        const value = event.target.textContent;

        switch (type) {
            case TYPES.DIGIT:
                expression += value;
                break;

            case TYPES.PLUS:
                // Добавляем + только если последний символ не является +
                if (expression && !expression.endsWith('+')) {
                    expression += value;
                }
                break;

            case TYPES.RESULT:
                result = calculateResult();
                break;

            case TYPES.RESET:
                expression = '';
                result = 0;
                break;
        }

        updateDisplay();
    });

    updateDisplay();
};

export default setCalculator;
