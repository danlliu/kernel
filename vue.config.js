module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/kernel/'
        : '/',
    pages: {
        'index': {
            entry: './src/main.js',
            template: 'public/index.html',
            title: 'kernel',
            chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
        },
        'stats': {
            entry: './src/main.js',
            template: 'public/index.html',
            title: 'kernel',
            chunks: [ 'chunk-vendors', 'chunk-common', 'stats' ]
        }
    }
}
