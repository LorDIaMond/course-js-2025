# Управление состоянием

### Что такое управление состоянием?

Технически каждый экземпляр компонента `Vue` уже "управляет" своим реактивным состоянием. Возьмём для примера простой компонент счетчика:

<div class="composition-api">

```html
<script setup>
import { ref } from 'vue'

// состояние
const count = ref(0)

// действия
function increment() {
  count.value++
}
</script>

<!-- представление -->
<template>{{ count }}</template>
```

Это самостоятельный блок, состоящий из следующих частей:

- **Состояние** - источник данных, который управляет нашим приложением;
- **Представление** - декларативное отображение **состояния**;
- **Действия** - возможные способы изменения состояния в ответ на пользовательский ввод из **представления**.

Это простое представление концепции "одностороннего потока данных":

<p style="text-align: center">
  <img alt="state flow diagram" src="./assets/state-flow.png" width="252px" style="margin: 40px auto">
</p>

Однако эта простота начинает нарушаться, когда у нас есть **несколько компонентов, имеющих общее состояние**:

1. Несколько представлений могут зависеть от одного и того же фрагмента состояния.
2. Действиям из разных представлений может потребоваться мутировать один и тот же фрагмент состояния.

В первом случае возможным обходным путем является "поднятие" общего состояния до общего компонента-предка, а затем передача его вниз в виде входных параметров. Однако это быстро становится утомительным в деревьях компонентов с глубокой иерархией, что приводит к другой проблеме, известной как **пробрасывание входных параметров (prop drilling)**.
![](./assets/prop-drilling.png)

Во втором случае мы часто прибегаем к таким решениям, как обращение к прямым родительским и дочерним экземплярам через ссылки на элементы шаблона или попытка мутировать и синхронизировать несколько копий состояния через генерируемые события. Оба эти паттерна являются хрупкими и быстро приводят к сложно поддерживаемому коду.

Более простым и понятным решением является извлечение общего состояния из компонентов и управление им в глобальном синглтоне. Таким образом, наше дерево компонентов превращается в большое "представление", и любой компонент может получить доступ к состоянию или вызвать действия, независимо от того, где он находится в дереве!

***

### Простое управление состояниям с помощью Reactivity API

Если у вас есть фрагмент состояния, который должен быть общим для нескольких экземпляров, вы можете использовать функцию [`reactive()`](/api/reactivity-core#reactive) для создания реактивного объекта, а затем импортировать его в несколько компонентов:

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

```html
<!--ComponentA.vue-->
<script setup>
import { store } from './store.js'
</script>

<template>Из компонента A: {{ store.count }}</template>
```

```html [ComponentB.vue]
<!--ComponentB.vue-->
<script setup>
import { store } from './store.js'
</script>

<template>Из компонента B: {{ store.count }}</template>
```

Теперь при каждом изменении объекта `store` и `<ComponentA>` и `<ComponentB>` будут автоматически обновлять свои представления - у нас теперь есть единый источник истины.

Однако это также означает, что любой компонент, импортирующий `store`, может мутировать его по своему усмотрению:

```html
<template>
  <button @click="store.count++">
    Из компонента B: {{ store.count }}
  </button>
</template>
```

Хотя в простых случаях это работает, глобальное состояние, которое может произвольно изменяться любым компонентом, в долгосрочной перспективе будет не очень удобным в поддержке. Для того чтобы логика изменения состояния была централизованной, как и само состояние, рекомендуется определять методы хранилища с именами, выражающими замысел действий:

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```html
<template>
  <button @click="store.increment()">
    Из компонента B: {{ store.count }}
  </button>
</template>
```

[Попробовать в песочнице](https://play.vuejs.org/#eNrNkk1uwyAQha8yYpNEiUzXllPVrtRTeJNSqtLGgGBsVbK4ewdwnT9FWWSTFczwmPc+xMhqa4uhl6xklRdOWQQvsbfPrVadNQ7h1dCqpcYaPp3pYFHwQyteXVxKm0tpM0krnm3IgAqUnd3vUFIFUB1Z8bNOkzoVny+wDTuNcZ1gBI/GSQhzqlQX3/5Gng81pA1t33tEo+FF7JX42bYsT1BaONlRguWqZZMU4C261CWMk3EhTK8RQphm8Twse/BscoUsvdqDkTX3kP3nI6aZwcmdQDUcMPJPabX8TQphtCf0RLqd1csxuqQAJTxtYnEUGtIpAH4pn1Ou17FDScOKhT+QNAVM)

***

**Совет**
> Обратите внимание, что в обработчике клика используется `store.increment()` со скобками — это необходимо для вызова метода с правильным контекстом, поскольку `this` не метод компонента.

***

Хотя здесь мы используем в качестве хранилища один реактивный объект, вы также можете обмениваться реактивным состоянием, созданным с помощью других   `API реактивности`, таких как `ref()` или `computed()`, или даже возвращать глобальное состояние из `composable`:

```js
import { ref } from 'vue'

// глобальное состояние, создаваемое в области видимости модуля
const globalCount = ref(1)

export function useCount() {
  // локальное состояние, создаваемое для каждого компонента
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

Тот факт, что система реактивности Vue отделена от модели компонентов, делает ее чрезвычайно гибкой.

***

### Pinia

Если в простых сценариях достаточно нашего решения по управлению состоянием, то в крупномасштабных производственных приложениях необходимо учитывать гораздо больше моментов:

- Более строгие соглашения для совместной работы команды
- Интеграция с инструментами `Vue DevTools`, включая временную шкалу, внутрикомпонентную проверку и отладку с перемещением во времени
- Механизм позволяющий модулям в приложении обновляться без перезагрузки страницы (`Hot Module Replacement`)
- Поддержка рендеринга на стороне сервера

[Pinia](https://pinia-ru.netlify.app) - это библиотека управления состояниями, реализующая всё вышеперечисленное. Она поддерживается основной командой Vue и работает как с `Vue 2`, так и с `Vue 3`.

Некоторые пользователи могут быть знакомы с [Vuex](https://vuex.vuejs.org/), предыдущей официальной библиотекой управления состояниями для `Vue`. Поскольку `Pinia` играет ту же роль в экосистеме, `Vuex` перешла в режим поддержки. Она продолжает работать, но больше не будет получать новых функций. Для новых приложений рекомендуется использовать Pinia.

`Pinia` начиналась как исследование того, как может выглядеть следующая итерация Vuex, и включала в себя множество идей из обсуждений основной команды `Vuex 5`. В конце концов, мы поняли, что `Pinia` уже реализует большую часть того, что мы хотели видеть во `Vuex 5`, и решили сделать ее новой рекомендацией.

По сравнению с `Vuex`, `Pinia` обеспечивает более простой `API` с меньшим количеством формальностей, предлагает `API` в стиле `Composition-API` и, что особенно важно, имеет надёжную поддержку вывода типов при использовании `TypeScript`.

**Почему Composition API в сторах?**
- **Гибкость:** Логика стора пишется как обычная функция, используя `ref`, `reactive` и другие хуки.
- **Читаемость:** Код ближе к стандартному `JavaScript`.
- **Повторное использование:** Легко выносить логику в хуки.

**Преимущества Pinia:**
- Нет разделения на действия и мутации.
- Полная поддержка `TypeScript`.
- Интуитивный `API`, схожий с `Composition API`.

**Аналогия:** `Pinia` с `Composition API` — это как умный органайзер, где всё организовано в одном месте и легко доступно.

***

### Создание стора с Composition API

`Pinia` позволяет определять сторы с помощью `defineStore`, используя синтаксис `setup` для `Composition API`. Это даёт доступ к `ref`, `computed` и другим хукам `Vue`.

**Пример стора:**

```javascript
// stores/todos.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodosStore = defineStore('todos', () => {
    // Состояние
    const todos = ref([])
    const filter = ref('all') // all, done, pending
    
    // Действия
    const addTodo = (text) => {
        todos.value.push({ text, done: false })
    }
    const toggleTodo = (index) => {
        todos.value[index].done = !todos.value[index].done
    }
    
    const clearCompleted = () => {
        todos.value = todos.value.filter(todo => !todo.done)
    }
    
    // Геттеры
    const filteredTodos = computed(() => {
        if (filter.value === 'done') {
            return todos.value.filter(todo => todo.done);
        }
        if (filter.value === 'pending') {
            return todos.value.filter(todo => !todo.done);
        }
    
        return todos.value
    });
    
    const todoCount = computed(() => todos.value.length)
    
    return {
        todos,
        filter,
        addTodo,
        toggleTodo,
        clearCompleted,
        filteredTodos,
        todoCount,
    };
});
```

**Использование в компоненте:**

```html
<template>
    <input
        v-model="newTodo"
        @keyup.enter="add"
        placeholder="Добавить задачу"
    >
    <button
        @click="store.clearCompleted"
    >
        Очистить завершённые
    </button>
    <select v-model="store.filter">
        <option value="all">Все</option>
        <option value="done">Завершённые</option>
        <option value="pending">Активные</option>
    </select>
    <ul>
        <li
            v-for="(todo, index) in store.filteredTodos"
            :key="index"
            @click="store.toggleTodo(index)"
        >
            {{ todo.text }} {{ todo.done ? '✔' : '' }}
        </li>
    </ul>
    <p>Всего задач: {{ store.todoCount }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { useTodosStore } from './stores/todos'

const store = useTodosStore()
const newTodo = ref('')

const add = () => {
    if (newTodo.value) {
        store.addTodo(newTodo.value)
        newTodo.value = ''
    }
}
</script>
```

[Попробовать в песочнице](https://play.pinia.vuejs.org/#eNqdVs1u20YQfpUtL5QAiWzgNgdFct0GObSHtmhyi3KQyZHEmNoluEvZhSCgcQ8pkALpj4FeigJ9gzSt0bRA/AzLV8iTZGaXpJaSbARZSBC58/PNfDszq5X3aZYFywK8gTdUsMjSiYLDMWe4hgnPCmWfaS37CxFDOhp7HE4fiFiMvY3w6AS+LbIAuIIcNSZx7ErRbQRzkcZGqC/0lf5Lv9Av9avyvPyR6X/x5R/9onxafl+b1UEcF0oJ7gBFaRKdoBepRA5BlMIkvyswcFDQYFbGtPQf5VOEeVKeu2Av9WX5XflD+bN+rV+Xz/RlhRZauBpcQgqRcjK3oNMkxTTHngMzFJlKBGfLSVoAEZCmKNe/lE/05TC0whvUY8GB9H/bF9s72GfA44TPyMVP+n/KFd3sMx6GNqf6tUhdr2myebFHPhV0Yh2Fx91jCY/hrIs/zOUBYioG6Z43rQFWBJoam23Z1iEqMZulQF46FsLVd+KjtVoxCiZQcKbYet28E4PsE+a/+f3CZwPm+yh0MgvTpGGgyXmYVSek/9ZXThUOyGsdWizuioIT1jDM0HAYOn2CrzLKk0wxCaogcbLIRK7YiuUwZWs2zcWC+dhgviMqpElW3ieIRikICUwGj6V/hzxHgkv0a3RGbZtOtxZXrYgKiNfxfRTUIuxB3O502eiQrWzCyZR1KovAlE63ltCyGaOZOYm23kartY8APmZG+8g2frC+DB+HXs+z+fYXkwxzEhxHjAHDmjACrBgk2hpjBSc8mdDO2AvNcwBy0T/OxamEHO3HXq9WPUI6wxiWSohU9idZYs3mSmVyEIZRzFEf+zVZ5gEHFfJsEe7YHN0OPg5uYVkchwgUmrprw6BFP4bFu3ivVY8+DG59FNw2XpcHldMFeSWnxBDSoiSezzSZbZES4RBLUsi/Mu3aJgeniTj9wuypvIAmxGgO0cme/ccSW46i/joHpG+Js6WRqUk+A2XF9+5/iW3kCHHOFSlq3yD8BqRIC4rRqn1W8BjDdvRMtJ+bM8aZ9EDeO1PAZZ0UBWrYMPqGZprf16W+CfcgOHBZrHoFCWz6KoZpwqHdVaaW/HHe7sweI7oLvDLaPYpq9IUzo2r7qN2tIxel45sw/F7TZmhMcYch03/qK3PtXJXPcZK/wjumElq3xrLq24ePum2hnax1VyOhfpd84kOP0aTrsXriV2Yu8AUOtP8MNF2wz9ueq/amyUAjtB02LUus6e4gK+S8gwMWFS3ugE0nqUR2m3jX21nVo5wQqgvjBoiHRuWRHd8j9sE1oh20Nmr7X4Az9faDooKbpSXb3HFkZWIwqLtJujT/ivf0OZJMt/WzfcdXXYyIVhdbZ09cNJOtfh3cCIcqweOZtzRp5XjN5Pym8DfR33GNmxSux6xK6v1gHdb247qbu+4apjfWu+1iL+IdOt2oUuAzNW8Orv6tAHcLoufu2JRaW1W7tPY2Nd7abhfhHsdVPWz5qtJqdteGAOTBW78Fuer0EA==)

**Интерактив:** Измените `store.filter` через консоль (`store.filter = 'done'`) и проверьте, как обновляется список задач.

**Аналогия:** Стор с `Composition API` — это как умный блокнот, где вы записываете задачи, а фильтры автоматически сортируют их.

---

### Модульная структура и пространства имён

`Pinia` использует модульную структуру, где каждый стор — это отдельный модуль с уникальным идентификатором, заданным в `defineStore`.

**Пример второго стора:**

```javascript
// stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref('Гость')
  const isAuthenticated = ref(false)

  const login = (userName) => {
    name.value = userName
    isAuthenticated.value = true
  }
  const logout = () => {
    name.value = 'Гость'
    isAuthenticated.value = false
  }

  const greeting = computed(() => `Привет, ${name.value}!`)

  return { name, isAuthenticated, login, logout, greeting }
})
```

**Комбинирование сторов:**

```html
<template>
    <p>
        {{ userStore.greeting }}
    </p>
    <button
        @click="userStore.login('Алиса')"
    >
        Войти
    </button>
    <button
        @click="userStore.logout"
    >
        Выйти
    </button>
    <ul>
        <li
            v-for="(todo, index) in todosStore.filteredTodos"
            :key="index"
        >
            {{ todo.text }}
        </li>
    </ul>
</template>

<script setup>
import { useTodosStore } from './stores/todos'
import { useUserStore } from './stores/user'

const todosStore = useTodosStore()
const userStore = useUserStore()
</script>
```

[Попробовать в песочнице](https://play.pinia.vuejs.org/#eNqdVt2O20QUfpVphOREytpUhV6EZNlS9QIuCqLlqqnUrD1J3HVmLHucXRRFapeLIrVSC12JGwTiDZbCii2o+wzjV+BJOGdmPB4n2bBgtRt75pzznfOdn5lF61aa+vOCtnqtvqCzNBkJujtkBJ5+al7wWSxIkdPsnuAZ9ScZpSJmE7JcGtGgku3vF0JwVivuhUkcHgyGrVo94ZOYtT35Sv4lz8un8tTrDFtaw0GU38sL+bY8lucVhjb934B4ITbaLp9vsV0hZBar+WYM9WOWgnlrdb4z4xFNwAVGD+/ziFfIyr0D+nWR+pQJmoHEKIrcXeA9pFOeRGpTnkDov8pT+Qb4OS5fEPkHfPwuT8tn5TdOOP/GhAAfck1FmNBRdptDgqmgFtql5KfyGWYDSakx38iz8kn5bfmdfCffAWdnm3OR04SGwiHAQR7HCYQ8bDlYfZ6KmDMyHyUFRTKSBPYhKU/lWT/Qm1vEI84oyv+wycEr6KeURVC9aOKV/BMDBjOblPuBDqz6LBLXahLXHzr9Y47Za2PwXRKziB514IeskUEjrI7cLQB8elAioK8UV/c25VTwySShaKqtwVwlx1PTv6jpC3okoG3tN3JJPibe3z+eeKRHPM/2tCYgiS0XNnoYDDpX8jd54dRmr7Jq/Yv4bV4wBNQToh84MwY+8zCLU0FyKgrcjmcpzwRZkIyOyZKMMz4jHgwnD4XtJvS3ok+BWDE/UMj+4xykXdmvqnHgiOKI0JJDFnKWC8dtMmgitDuVjB0sWsQaRolKxnQ+SEAMbQ8mm92ClofldocMdslCMxmPSdto+Ko6O9UOPg6VoKvy3BSuRRvrgOJBaLgOuYR/UMeK6N1Wt6Wp2ZmNUiCAM5j7ChHKTm1AUUIazRhspTGLR7gybAXq3af5bGc/44eawGGrW4nuQZ6CiM4F50m+M0pjrTYVIs17QRBGDORhOMTzzGdUBCydBWs6ezf9D/3rUHT7AQAFqqqbMKCxE9HZVaxXonvv+9c/8G8qq/MbxugMraJRZAhoETkkaRxPVkgJYWLGCc0+V2OhSQ5MLX74mVoTWUGti+GUhgcb1h/n0NXo9RcZBfrmMMPsnhhlEwonFW7fuXcXmtTZhKFaJCC9ZfNLmvOkQB+12CcFi8BtR055+6nKMcy++/mdI0FZXgWFjio2lLyiGQ+Ly0Kv3b3h33BYNH0F/AUBybFy86rXnKaM6DhmtNmTqrrczoX26RKkv4Dzam0Y0CMlZvuybvKBa77tIbrXdbvO9OlohrKqSeVreYEHX/kC27WSiPNbhZjCeR2HMK+wdVF4PEpybLxaTt1msLER6i6YdRscYWxTVgKm95v2rZRNRQMC7jGrw6Nh2w1iu30VgQGoIeyVbmBJb2u0R/Ln8ok6Is/K4y55b1HjLq89MlRkMMEzBmnDTTj7mthdTZL6gUC6NRrWTQfbz8zuRuVUi8PsasXjim0pHxDD/6sl5JwpKzWk/HCKCJSRYHBU/qJJh78v4QJyDvcjs+mcKqZyHjzsNDf1XaAqQuhPr4M24aVL8FjukuqiYtRc4BM4fd8qaLwjvmxaNqcFFgye90237cmic+inRT5tw7kNghq3p0uELK2/y9WoqnsHIph7zhaIB0rkob5rDMi1S7bW0JqozRus0wybQbGTnCg12epqhlrKB4W6HqRL82sseiAZL5nPN6XPXOXW26bhF57zWr5ybgAti/CQ84YkPqaZtrhfe/+Rq2xDuBzTlNT/g3VY24zrLq6bs0zX2uvtoi+Ma3S6XiWUTcTUJq76rWbQWkF03RUdUmPJtEtjra7xxnKzCDcYNvWwYsuEZVeXigDgobX8BwN9VQc=)

**Пространства имён:** Уникальный идентификатор (`'todos'`, `'user'`) предотвращает конфликты. Сторы автоматически разделены, но могут взаимодействовать через прямые вызовы.

**Аналогия:** Каждый стор — это отдельная папка в органайзере, где всё чётко разделено, но доступно для совместной работы.

---

### Сохранение состояния с Pinia Persist

**pinia-plugin-persistedstate** сохраняет состояние в `localStorage`.

**Установка:**

```bash
yarn add pinia-plugin-persistedstate
```

**Настройка:**

```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia).mount('#app')
```

**Пример:**

```javascript
// stores/todos.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])

  const addTodo = (text: string) => {
    todos.value.push({ text, done: false })
  }

  return { todos, addTodo }
}, {
  persist: true // Сохраняет todos в localStorage
})
```

**Аналогия:** `Persist` — это сейф, сохраняющий данные даже при перезагрузке страницы.

---

### Заключение

**Итоги:**
- `Pinia` с `Composition API` упрощает управление состоянием.
- Сторы интуитивны, модульны и типобезопасны.
- Интеграция с `v-model` и `localStorage` делает разработку удобной.

**Аналогия:** `Pinia` с `Composition API` — это ваш личный ассистент, который держит данные в порядке и синхронизирует их с интерфейсом.

---
