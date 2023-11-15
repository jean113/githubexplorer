const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebPackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

//verifica se está em desenvolvimento ou produção
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production' , //modo desenvolvimento, execução mais rápida
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', /**Aponta os erros no código de forma mais legivel de acordo
                                com o que vc digitou */
    entry: path.resolve(__dirname, 'src', 'index.tsx'), //arquivo de entrada que será covnertido
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
        modules: ['node_modules'],
    },
    //configura o webpack para sempre monitorar se houver alguma mudança 
    //no src, atualizar automaticamente o index.html da pasta public
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
          }, 
          hot: true,
    },
    plugins: [
        //indica qual vai ser o arquivo onde vai injetar o script src que aponta para o arquivo .html principal de onde roda as aplicações
        //lembre-se que vc tem que usar o index.html gerado no dist
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        /**1 - Fast refresh - Quando vc muda o código, reiniciando o server, os componentes
         * não serão resetados, assim vc não precisa reiniciar o procedimento todo
         * Isso só em tempo de desenvolvimento.
         * Exceto quando vc da o ctrl + F5
         * 
         * 2- quando vc tem um if ternário sem o else - 
         * ex.: isDevelopment ? new ReactRefreshWebPackPlugin() : '' você pode trocar pelo && como abaixo
         * - pode usar na programação também
         * 
         * 3 - como o resultado disso é um boolean usar o hack .filter(Boolean)
         */
        isDevelopment && new ReactRefreshWebPackPlugin()   
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx/, /** verifica se é arquivo .jsx, colocar (j|t) vai trabalhar com arquivos que iniciam
                                    com jsx ou tsx - typescript */
                exclude: /node_modules/, /** não vai usar  da pasta node_modules, porque isso é responsablidade da biblioteca */
                use: {
                    loader: 'babel-loader', /** integração entre babel e webpack */
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel'),
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss/, /** verifica se é arquivo .jsx */
                exclude: /node_modules/, /** não vai usar  da pasta node_modules, porque isso é responsablidade da biblioteca */
                use: ['style-loader', 'css-loader', 'sass-loader'], /** integração css e loader e sass*/
            },
        ],
    }
};