module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        ['@babel/preset-react', {
            runtime: 'automatic' /** isso faz com que não precise importar a biblioteca react, a partir do react 17 */
        }]
    ]
}