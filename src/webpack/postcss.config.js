const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        autoprefixer(),
        process.env.NODE_ENV === 'production' ? cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
            }]
        }) : false,
    ],
    sourceMap: true,
};