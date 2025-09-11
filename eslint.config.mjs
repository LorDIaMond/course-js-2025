import eslintPluginVue from 'eslint-plugin-vue';
import stylisticESLintPlugin from '@stylistic/eslint-plugin';
import { rules as airbnbRules } from 'eslint-config-airbnb-extended';
import { importX } from 'eslint-plugin-import-x';
import ts from 'typescript-eslint';
import vueEslintParser from 'vue-eslint-parser';
import globals from 'globals';

export default ts.config(
    ts.configs.eslintRecommended,
    ...ts.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        languageOptions: {
            parser: vueEslintParser,
            parserOptions: {
                ecmaVersion: 14,
                sourceType: 'module',
                parser: ts.parser,
            },
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        plugins: {
            '@stylistic': stylisticESLintPlugin,
            '@typescript-eslint': ts.plugin,
            'import-x': importX,
        },
        rules: {
            ...airbnbRules.base.bestPractices.rules,
            ...airbnbRules.base.errors.rules,
            ...airbnbRules.base.style.rules,
            ...airbnbRules.base.stylistic.rules,
            ...airbnbRules.base.variables.rules,
            ...airbnbRules.base.es6.rules,
            ...airbnbRules.base.imports.rules,
            ...airbnbRules.base.strict.rules,
            'import-x/no-unresolved': 'off',
            'import-x/extensions': 'off',
            'import-x/no-useless-path-segments': ['error', {
                noUselessIndex: false,
            }],
            'import-x/order': 'off',
            'import-x/no-extraneous-dependencies': ['error', {
                devDependencies: true,
                optionalDependencies: false,
            }],
            'import-x/prefer-default-export': 'off',
            'vue/html-indent': ['warn', 4, {
                attribute: 1,
                alignAttributesVertically: true,
            }],
            'vue/no-v-html': 'off',
            'vue/html-quotes': ['error', 'double', { avoidEscape: false }],
            'vue/custom-event-name-casing': ['error', 'kebab-case'],
            'vue/match-component-file-name': ['error', {
                extensions: ['vue'],
                shouldMatchCase: true,
            }],
            'vue/no-unused-emit-declarations': 'warn',
            'vue/no-unused-properties': ['warn', {
                groups: ['props', 'methods', 'data', 'computed', 'setup'],
            }],
            'vue/no-use-v-else-with-v-for': 'error',
            'vue/no-useless-mustaches': 'warn',
            'vue/padding-line-between-blocks': 'warn',
            'vue/prefer-separate-static-class': 'warn',
            'vue/prefer-true-attribute-shorthand': 'warn',
            'vue/require-name-property': 'warn',
            'vue/component-name-in-template-casing': ['error', 'PascalCase', {
                registeredComponentsOnly: false,
            }],
            'vue/no-root-v-if': 'warn',
            'vue/no-unused-refs': 'error',
            'vue/v-bind-style': ['warn', 'shorthand', {
                sameNameShorthand: 'never',
            }],
            'vue/no-multiple-template-root': 'off',
            'vue/valid-define-emits': [
                'error',
            ],
            'vue/define-emits-declaration': [
                'error',
                'type-literal',
            ],
            'vue/valid-define-props': [
                'error',
            ],
            'vue/define-props-declaration': [
                'error',
                'type-based',
            ],
            // Правила для миграции на Vue3
            'vue/no-deprecated-data-object-declaration': 'error',
            'vue/no-deprecated-filter': 'error',
            'vue/no-deprecated-functional-template': 'error',
            'vue/no-deprecated-inline-template': 'error',
            'vue/no-deprecated-props-default-this': 'error',
            'vue/no-deprecated-scope-attribute': 'error',
            'vue/no-deprecated-slot-attribute': 'error',
            'vue/no-deprecated-slot-scope-attribute': 'error',
            'vue/comment-directive': 'off',
            'vue/no-v-for-template-key': 'off',
            'vue/no-v-for-template-key-on-child': 'warn',
            'vue/attributes-order': 'off',
            'vue/require-explicit-emits': 'warn',
            // Правила, работающие в js файлах и в теге <script> vue файлов
            '@stylistic/quotes': ['warn', 'single', { avoidEscape: false }],
            '@stylistic/indent': ['warn', 4, {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1,
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1,
                },
                CallExpression: {
                    arguments: 1,
                },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                ignoreComments: false,
            }],
            'no-console': ['error', {
                allow: ['warn', 'error'],
            }],
            '@stylistic/max-len': ['warn', {
                code: 120,
            }],
            'no-alert': 'off',
            'no-debugger': 'warn',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'LabeledStatement',
                    message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
                },
                {
                    selector: 'WithStatement',
                    message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
                },
            ],
            'no-continue': 'off',
            '@stylistic/spaced-comment': 'off',
            '@stylistic/no-tabs': 'off',
            '@stylistic/linebreak-style': 'off',
            '@stylistic/eol-last': 'off',
            'prefer-template': 'off',
            '@stylistic/template-curly-spacing': 'off',
            'prefer-destructuring': 'off',
            '@stylistic/arrow-parens': 'off',
            'no-param-reassign': ['warn', {
                props: true,
                ignorePropertyModificationsFor: [
                    'acc', // for reduce accumulators
                    'accumulator', // for reduce accumulators
                    'e', // for e.returnValue
                ],
                ignorePropertyModificationsForRegex: [
                    'Acc$',
                    'Var$',
                ],
            }],
            'no-shadow': ['error', {
                allow: [
                    'state',
                ],
            }],
            '@stylistic/object-curly-spacing': ['warn', 'always'],
            'arrow-body-style': ['warn', 'as-needed', {
                requireReturnForObjectLiteral: false,
            }],
            curly: ['error', 'all'],
            'no-underscore-dangle': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
);
