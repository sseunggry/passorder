const CracoAlias = require('craco-alias');

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
    ],
};
// const { CracoAliasPlugin } = require('react-app-alias');
//
// module.exports = {
//     plugins: [
//         {
//             plugin: CracoAliasPlugin,
//             options: {
//                 source: 'tsconfig',
//                 baseUrl: '.',
//                 tsConfigPath: './tsconfig.paths.json'
//             }
//         }
//     ]
// };