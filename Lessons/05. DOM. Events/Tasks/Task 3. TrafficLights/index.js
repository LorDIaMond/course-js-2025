const LIGHTS = {
    red: {
        type: 'red',
        text: 'Красный',
    },
    yellow: {
        type: 'yellow',
        text: 'Желтый',
    },
    green: {
        type: 'green',
        text: 'Зеленый',
    },
};

const resetLights = () => {
    const trafficLightsContainer = document.querySelector('.traffic__lights-container');
    const spans = trafficLightsContainer.querySelectorAll('span');
    spans.forEach(span => {
        span.classList.remove('red-light', 'yellow-light', 'green-light');
    });
};

const setLight = (type) => {
    const trafficLightsContainer = document.querySelector('.traffic__lights-container');
    resetLights();
    const lightIndex = Object.keys(LIGHTS).indexOf(type);

    const spans = trafficLightsContainer.querySelectorAll('span');
    if (spans[lightIndex]) {
        spans[lightIndex].classList.add(`${type}-light`);
    }
};

const setTrafficLight = () => {
    const trafficLights = document.querySelector('.traffic__lights');
    const trafficLightsContainer = document.createElement('div');

    trafficLightsContainer.className = 'traffic__lights-container';
    trafficLights.appendChild(trafficLightsContainer);

    const redLight = document.createElement('span');
    redLight.className = 'red-light';
    trafficLightsContainer.appendChild(redLight);
    const yellowLight = document.createElement('span');
    trafficLightsContainer.appendChild(yellowLight);
    const greenLight = document.createElement('span');
    trafficLightsContainer.appendChild(greenLight);

    const trafficLightsSelect = document.querySelector('.traffic__lights-select');
    const select = document.createElement('select');

    select.className = 'form-select';
    trafficLightsSelect.appendChild(select);

    Object.values(LIGHTS).forEach(light => {
        const option = document.createElement('option');
        option.value = light.type;
        option.textContent = light.text;
        select.appendChild(option);
    });

    setLight('red');

    select.addEventListener('change', function() {
        setLight(this.value);
    });
};

export default setTrafficLight;
