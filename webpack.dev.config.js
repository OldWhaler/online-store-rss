const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        hot: true,
        port: 8080,
        compress: true,
        static: {
            directory: path.resolve(__dirname),
            watch: true,
        },
    },
};
