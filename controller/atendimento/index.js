const Atendimento = require('../../models/atendimento.js')

module.exports = app => {
  app.get('/atendimento', (req, res) => {
    res.status(200).json({ msg: 'ok' });
  })

  app.post('/atendimento', (req, res) => {
    const atendimento = req.body

    Atendimento.adiciona(atendimento, res)
  })
}

