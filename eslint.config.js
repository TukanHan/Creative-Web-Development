// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/prefer-on-push-component-change-detection': 'error',
            '@angular-eslint/no-output-native': 'error',
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/prefer-signals': 'error',
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            '@typescript-eslint/explicit-member-accessibility': [
                'warn',
                {
                    overrides: {
                        constructors: 'no-public',
                    },
                },
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                {
                    allowExpressions: true,
                },
            ],
            '@typescript-eslint/prefer-readonly': 'warn',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-deprecated': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            curly: 'error',
            'no-duplicate-imports': 'error',
            'consistent-return': 'error',
        },
    },
    {
        files: ['**/*.html'],
        extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
        rules: {
            '@angular-eslint/template/prefer-self-closing-tags': 'error',
        },
    },
]);
