### 1. Методы экземпляра — жизненный цикл - императивный подход

Жизненный цикл

![](./assets/lifecycle.png)

В Composition API хуки вызываются через функции вроде `onMounted`:

**Список:**
- `onBeforeMount`
  - Когда вызывается этот хук, компонент завершил настройку своего реактивного состояния, но ни один из узлов `DOM` еще не был создан. Он собирается впервые выполнить свой эффект рендеринга `DOM`.
- `onMounted`
  - Все дочерние компоненты были смонтированы (не включая асинхронные компоненты)
  - Его собственное `DOM`-дерево было создано и вставлено в родительский контейнер.
- `onBeforeUpdate`
  - Этот хук можно использовать для доступа к состоянию `DOM` до того, как `Vue` обновит `DOM`. Также безопасно изменять состояние компонента внутри этого хука.
- `onUpdated`
  - Хук обновления родительского компонента - вызывается после хука обновления его дочерних компонентов.
  - Этот хук вызывается после любого обновления `DOM` компонента, которое может быть вызвано различными изменениями состояния.
- `onBeforeUnmount`
  - Когда вызывается этот хук, экземпляр компонента остается полностью функциональным
- `onUnmounted`
  -  Компонент считается размонтированным после того, как:
     - Все его дочерние компоненты были размонтированы.
     - Все связанные с ним реактивные эффекты (эффект рендеринга и вычисления/наблюдатели, созданные во время `setup()`) были остановлены.

**Пример:**

```javascript
import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('Компонент готов!');
    });
  }
}
```

- **Гибкость:** Можно вызывать хуки условно или несколько раз.

***

В каждом экземпляре компонента доступен ряд методов

- `app.mount` - метод для монтирования элемента:

```javascript
import { createApp } from 'vue'

const Component = {
    template: '<span>Я компонент</span>'
}

// Создаём приложение и монтируем его в #some-id
createApp(Component).mount('#some-id')
```

- `app.unmount` - уничтожает переданное приложение (удаляет из `DOM`-дерева)
```javascript
<script>
    export default {
    name: "Component",
    updated() {
    // В Vue 3 рекомендуется использовать управление через v-if или другое реактивное состояние
        this.$.appContext.app.unmount();
    },
}
</script>
```

- `vm.$nextTick` - вызывает переданную функцию после очередного обновления `DOM`:

```javascript
watch: {
  groups: function () {
    this.$nextTick(() => {
      // Отработает строго после очередного обновления DOM
      renderTooltip(this);
    });
  },
},
```

### 2. Свойства экземпляра

- `vm.$data` - объект `data` компонента, содержит все ключи;
- `vm.$props` - пропы компоненте;
- `vm.$el` - текущий элемент;
- `vm.$options` - опции, переданные в конструктор экземпляра;
- `vm.$slots` (подробнее см. в следующем уроке);
- `vm.$scopedSlots` (подробнее см. в следующем уроке);
- `vm.$refs` (подробнее см. ниже);
- `vm.$isServer` - запущен ли данный экземпляр на сервере;
- `vm.$listeners` - массив обработчиков событий созданных через `v-on`;
- `vm.$root` - ссылка на корневой элемент в дереве компонентов;
- `vm.$parent` (подробнее см. ниже);

#### $refs

Данное свойство позволяет обращаться к элементам в `template`. <br>
При этом обращаться можно как стандартным `html`-тегам, так и к используемым в `template`
дочерним компонентам.

```javascript
<template>
  <div class="container">
    <div ref="description">
      Описание страницы
    </div>
    <UserBlock ref="userBlock"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import UserBlock from './UserBlock.vue';

export default {
  name: 'Element',
  components: {
    UserBlock,
  },
  setup() {
    const description = ref(null)
    const userBlock = ref(null)
    
    onMounted(() => {
      // обращаемся к элементу и берем у него высоту
      const descriptionHeight = description.value.offsetHeight;
      
      // обращаемся к дочернему компоненту и используем какие-то данные внутри него
      // например, вызываем какой-либо метод
      userBlock.value.updateUser();
    })
    
    return {
      description,
      userBlock
    }
  }
}
</script>
```

#### $parent [самостоятельное изучение]

Обращение к родительскому элементу:

```javascript
<script>
import { onMounted, getCurrentInstance } from 'vue'

export default {
  setup() {
    const instance = getCurrentInstance()
    
    onMounted(() => {
      const containerHeight = instance.parent.proxy.getHeight();
    })
  }
}
</script>
```

***


### 3. Templates

Шаблоны в шаблонах - способ определить логику на родительском элементе без добавления
самого элемента

```javascript
<template>
  <section>
    <h2>Заголовок</h2>
    <template v-if="isIconShown">
      <Icon/>
    </template>
  </section>
</template>
```

Здесь сам `template` не будет отображаться в `DOM`-дереве, то есть если `v-if`
будет `true`, `DOM`-дерево будет иметь следующую структуру:

```javascript
<template>
    <section>
        <h2>Заголовок</h2>
        <svg/>
    </section>
</template>
```

***

### 4. Совместное использование v-if и v-for

В `Vue` `3` `v-if` имеет более высокий приоритет, чем `v-for`, но совместное использование все равно не рекомендуется.

Данную проблему можно решить двумя способами:

1. Для случаев с общим условием для всех элементов массива - вынос `v-if` на родительский элемент:

Заменяем

```javascript
<div>
  <span
    v-for="student in students"
    v-if="showStudents"
  >
    {{ student.name }}
  </span>
</div>
```

на

```javascript
<div v-if="showStudents">
  <span v-for="student in students">
    {{ student.name }}
  </span>
</div>
```

2. Для случаев с уникальными условиями для каждого элемента массива - фильтрация массива в `computed`-свойстве:

```javascript
<div>
  <span v-for="student in currentStudents">
    {{ student.name }}
  </span>
</div>

<script>
import { computed } from 'vue'

export default {
  setup(props) {
    const currentStudents = computed(() => {
      return props.students.filter(({ hasProject }) => hasProject);
    })
    
    return {
      currentStudents
    }
  }
}
</script>
```

### 5. Динамические компоненты - component is [самостоятельное изучение]

Динамические компоненты - один из способов повышения гибкости при разработке приложений
на `vue`. <br>
Данный метод применяется для случаев, когда в конкретном месте шаблона необходимо
отображать разные компоненты, а вариант с `v-if/v-else` неуместен, так как таких
компонентов может быть много.

```javascript
<template>
  <component
    :is="isMobile ? MobileButton : CommonButton"
    @click="showFilter"
  />
</template>

<script>
import { computed } from 'vue'
// Импортируем возможные компоненты
import CommonButton from './CommonButton.vue';
import MobileButton from './MobileButton.vue';

export default {
  name: 'Filter',
  components: {
    CommonButton,
    MobileButton,
  },
  props: {
    theme: {
      type: String,
      default: 'mobile',
    },
  },
  setup(props) {
    const isMobile = computed(() => {
      return props.theme === 'mobile';
    })
    
    return {
      isMobile,
      CommonButton,
      MobileButton
    }
  }
}
</script>
```

***

### 6. Создание кастомных директив

Для низкоуровневых операций с `DOM`-деревом может быть уместно создание своих директив,
которые будут добавляться к элементам в шаблоне аналогично встроенным директивам (`v-bind`
, `v-show` и т.д.)

Создадим директиву `v-trim`, очищающую содержимое элемента от концевых пробелов:

```javascript
// Создаем директиву `v-trim` глобально
const app = createApp({})
app.directive('trim', {
  mounted: (element) => {
    // element - элемент, на котором мы установили нашу директиву
    const elementText = element.textContent;
    element.textContent = elementText.trim();
  }
})
```

Используем директиву:

```javascript
<template>
  <div v-trim>
    {{ description }}
  </div>
</template>
```

Ключ `mounted` позволяет описать логику, которая выполнится после вставки текущего
элемента внутрь родительского. Есть и другие моменты в жизненном цикле директивы:

- `beforeMount` - вызывается перед монтированием элемента;

- `mounted` - вызывается после монтирования элемента;

- `beforeUpdate` - вызывается перед обновлением элемента;

- `updated` - вызывается после обновления элемента;

- `beforeUnmount` - вызывается перед размонтированием элемента;

- `unmounted` - вызывается после размонтирования элемента.

Также в директиву можно передать данные (в том числе и динамически). Делается при помощи
аргумента `bindings`:

```javascript
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```javascript
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

### 7. Фрагменты [самостоятельное изучение]

`Vue` `3` версии позволяет устанавливать несколько корневых элементов в шаблон:

```
<template>
    <section class="header-section"></section>
    <section class="main-section"></section>
    <section class="footer-section"></section>
</template>
```

`Vue` `2` такой возможности "из коробки" не предоставляет, однако данный момент можно
обойти:

1. **[Fragment](https://www.npmjs.com/package/vue-fragment)**

```
<template>
    <fragment>
        <tr class="element-one"></tr>
        <tr class="element-two"></tr>
        <tr class="element-three"></tr>
        <tr class="element-four"></tr>
    </fragment>
</template>

<script>
import Vue from 'vue';
import {Plugin} from 'vue-fragment';
Vue.use(Plugin);
...
```

2. **[vue-frag](https://www.npmjs.com/package/vue-frag)**

```
<template>
    <div v-frag>
        <tr class="element-one"></tr>
        <tr class="element-two"></tr>
        <tr class="element-three"></tr>
        <tr class="element-four"></tr>
    </div>
</template>

<script>
import frag from "vue-frag";

export default {
    name: "SomeComponent",
    directives: {
        frag
    },
}
```

***

### 8. Создание модальных окон на Vue

Модальные окна на `Vue` могут быть созданы множеством способов - от кастомных решений до
использования специальных библиотек

В директории `./examples/Modal.vue` представлен пример создания модальных окон при помощи
[vue-js-modal](https://www.npmjs.com/package/vue-js-modal)
