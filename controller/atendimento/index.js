const Atendimento = require('../../models/atendimento.js')

module.exports = app => {
  app.get('/atendimento', (req,res) => {
    Atendimento.lista(res); 
  })

  app.get('/atendimento/:id', (req, res) => {
    const { id } = req.params;

    Atendimento.buscaPorId(Number(id), res);
  })

  app.post('/atendimento', (req, res) => {
    const atendimento = req.body

    Atendimento.adiciona(atendimento, res)
  })

  // Vamos ultilizar o patch para atualizar os dados ele pode atualizar 1 ou 
  // todos os dados.
  app.patch('/atendimento/:id', (req, res) => {
    const { id } = req.params;
    const valores = req.body;

    Atendimento.altera(id, valores, res);
  })

  app.delete('/atendimento/:id', (req, res) => {
    const { id } = req.params;

    Atendimento.delete(id, res);
  })
}

