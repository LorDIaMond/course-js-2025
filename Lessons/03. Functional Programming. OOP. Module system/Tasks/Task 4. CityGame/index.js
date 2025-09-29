class CityGame {
    constructor(...players) {
        if (players.length < 2) {
            throw new Error('Должно быть как минимум 2 игрока');
        }
        this.players = players;
        this.currentPlayerIndex = 0;
        this.usedCities = [];
        this.isGameOver = false;
        this.winner = null;
    }

    play(city) {
        if (this.isGameOver) {
            return `Game over! The winner is ${this.winner}`;
        }

        if (!this.isValidMove(city)) {
            this.isGameOver = true;
            this.winner = this.players[(this.currentPlayerIndex - 1 + this.players.length) % this.players.length];
            return `Game over! The winner is ${this.winner}`;
        }

        this.usedCities.push(city);

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

        return {
            cities: [...this.usedCities],
            currentPlayer: this.getCurrentPlayer(),
        };
    }

    isValidMove(city) {
        if (typeof city !== 'string' || city === '') {
            return false;
        }

        const validCity = city.toLowerCase();

        if (this.usedCities.some(usedCity => usedCity.toLowerCase() === validCity)) {
            return false;
        }

        if (this.usedCities.length > 0) {
            const lastCity = this.usedCities[this.usedCities.length - 1].toLowerCase();
            const lastLetter = this.getLastLetter(lastCity);
            const firstLetter = validCity[0];

            if (firstLetter !== lastLetter) {
                return false;
            }
        }

        return true;
    }

    getLastLetter(city) {
        return city[city.length - 1];
    }

    restart() {
        this.usedCities = [];
        this.currentPlayerIndex = 0;
        this.isGameOver = false;
        this.winner = null;
        return 'The game restarted!';
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
}

export default CityGame;
