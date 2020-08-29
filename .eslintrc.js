module.exports = {
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript',
    ],
    rules: {
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'only-multiline'],
        'array-bracket-spacing': ['error', 'never'],
    },
}
