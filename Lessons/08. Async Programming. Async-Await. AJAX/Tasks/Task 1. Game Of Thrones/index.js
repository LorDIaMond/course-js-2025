const getCharacterData = (characterId, key) => {
    const url = `https://www.anapioficeandfire.com/api/characters/<id>`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            let value = data[key];

            if (Array.isArray(value)) {
                value = value.join(', ') || 'нет данных';
            }

            if (!value) {
                value = 'нет данных';
            }

            return `${data.name}, ${key}: ${value}`;
        });
};

export default getCharacterData;
