module.exports = {
    target: 'node',
    mode: 'development',
    entry: './app.js',
    resolve: {
        modules: ['server', 'node_modules'],
    },
};