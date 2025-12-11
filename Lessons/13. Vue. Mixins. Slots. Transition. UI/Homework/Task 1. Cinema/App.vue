<template>
    <div class="cinema">
        <h2>Режиссеры</h2>
        <div class="cinema__elements">
            <DirectorCard
                v-for="director in directors"
                :key="director.id"
                :director="director"
            />
        </div>
        <h2>Фильмы</h2>
        <div class="cinema__elements">
            <MovieCard
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
            />
        </div>
    </div>
</template>

<script>
import DirectorCard from './components/DirectorCard.vue';
import MovieCard from './components/MovieCard.vue';

export default {
    name: 'Cinema',
    components: { DirectorCard, MovieCard },
    props: {
        directors: {
            type: Array,
            default: () => [
                {
                    id: 0,
                    name: 'Кристофер Нолан',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/directors/nolan.jpg',
                    age: 51,
                    birthPlace: 'Лондон, Великобритания',
                    movies: 'Интерстеллар, Начало, Помни, Престиж',
                },
                {
                    id: 1,
                    name: 'Гильермо дель Торо',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/directors/deltoro.jpg',
                    age: 57,
                    birthPlace: 'Гвадалахара, Мексика',
                    movies: 'Мутанты, Форма воды, Тихоокеанский рубеж',
                },
                {
                    id: 2,
                    name: 'Квентин Тарантино',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/directors/tarantino.jpg',
                    age: 58,
                    birthPlace: 'Теннесси, США',
                    movies: 'Криминальное чтиво, Однажды в Голливуде',
                },
                {
                    id: 3,
                    name: 'Мартин Скорсезе',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/directors/skorseze.jpg',
                    age: 79,
                    birthPlace: 'Нью-Йорк, США',
                    movies: 'Волк с Уолл-стрит, Славные парни, Ирландец',
                },
                {
                    id: 4,
                    name: 'Хаяо Миядзаки',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/directors/hayao-miyazakis.jpg',
                    age: 80,
                    birthPlace: 'Токио, Япония',
                    movies: 'Унесенные призраками, Ходячий замок',
                },
            ],
        },
        movies: {
            type: Array,
            default: () => [
                {
                    id: 0,
                    name: 'Интерстеллар',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/movies/interstellar.jpg',
                    director: 'Кристофер Нолан',
                    year: 2014,
                    genre: 'фантастика, драма, приключения',
                },
                {
                    id: 1,
                    name: 'Песнь моря',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/movies/songofthesea.jpg',
                    director: 'Томм Мур',
                    year: 2014,
                    genre: 'фантастика, мультипликация',
                },
                {
                    id: 2,
                    name: 'Трудности перевода',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/movies/lost-in-translation.jpg',
                    director: 'София Коппола',
                    year: 2003,
                    genre: 'драма, мелодрама',
                },
                {
                    id: 3,
                    name: 'Шоу Трумана',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/movies/truman-show.jpg',
                    director: 'Питер Уир',
                    year: 1998,
                    genre: 'драма, комедия',
                },
                {
                    id: 4,
                    name: 'Мой сосед Тоторо',
                    image: '/Lessons/13. Vue. Mixins. Slots. Transition. UI/Homework/Task 1. Cinema/assets/movies/totoro.jpg',
                    director: 'Хаяо Миядзаки',
                    year: 1988,
                    genre: 'аниме, мультфильм, фэнтези, приключения, семейный',
                },
            ],
        },
    },
};
</script>

<style>
.cinema {
    padding: 60px;
    background-color: #f4f4f4;
}

.cinema > h2 {
    margin-bottom: 20px;
}

.cinema__elements {
    display: flex;
    flex-wrap: wrap;

}
</style>
