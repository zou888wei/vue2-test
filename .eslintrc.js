module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'vue/multi-word-component-names': 0,
    },
}