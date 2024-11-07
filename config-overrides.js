const path = require('path');

module.exports = function override(config) {
    config.resolve.alias = {
        'api': path.resolve(__dirname, 'src/api'),
        'components': path.resolve(__dirname, 'src/components'),
        'context': path.resolve(__dirname, 'src/context'),
        'hooks': path.resolve(__dirname, 'src/hooks'),
        'pages': path.resolve(__dirname, 'src/pages'),
        'reducer': path.resolve(__dirname, 'src/reducer'),
        'styles': path.resolve(__dirname, 'src/styles'),
        'templates': path.resolve(__dirname, 'src/templates'),
        'utils': path.resolve(__dirname, 'src/utils'),
    };

    return config;
};