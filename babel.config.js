module.exports = function (api) {
    api.cache(true)

    const presets = ['@babel/preset-env', '@babel/preset-react']
    const plugins = [
        "lodash",
        'babel-plugin-styled-components',
        '@babel/plugin-syntax-dynamic-import',
        ["@babel/plugin-proposal-decorators",{ "legacy": true }],
        ['@babel/plugin-proposal-class-properties',{ "loose" : true }],
    ]

    return {
        presets,
        plugins
    }
}