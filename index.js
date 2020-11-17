const customExpress = require('./config/custom-express.js')
const conexao = require('./infraestrutura/conexao.js')
const Tabelas = require('./infraestrutura/tabelas.js')

conexao.connect(erro => {
  if(erro) {
    console.log(erro)
  } else {
    console.log('connectado com sucesso.')

    Tabelas.init(conexao);

    const app = customExpress()
    app.listen(3000, () => {
      console.log('servidor rodando na porta 3000');
    })
  }
})

