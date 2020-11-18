const moment = require('moment')
const conexao  = require("../infraestrutura/conexao.js")

class Atendimento{
  adiciona(atendimento, res) {
    //const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou iqual a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres.'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length;

    if(existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data}
      const sql = 'INSERT INTO Atendimentos SET ?'

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if(erro) {
          res.status(400).json(erro)
        } else {
          res.status(201).json(resultados)
          // res.status(201).json(atendimento)
        }
      })
    }
  }

  lista(res) {
    const sql = "SELECT * FROM Atendimentos"

    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  } 

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${Number(id)}`

    conexao.query(sql, (erro, resultados) => {
      //const atendimento = resultados[0];
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados[0])
      }
    })
  }

  altera(id, valores, res) {
    if(valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }
    const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'

    conexao.query(sql, [valores, Number(id)], (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        // res.status(200).json({...valores, id})
        res.status(200).json({ msg: `O atendimento com os valores alterados é 
        o de numero ${id}` });
      }
    })
  }

  delete(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id = ?"

    conexao.query(sql, Number(id), (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({ msg: `O Atendimento deletado é o de numero: ${id}` })
      }
    })
  }
}

module.exports = new Atendimento;