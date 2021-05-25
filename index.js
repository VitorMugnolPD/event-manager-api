const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')
const { request, response } = require('express')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getFuncionario = (request, response) => {
  pool.query('SELECT * FROM CrowdMeet.Funcionarios', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addEvento = (request, response) => {
  const {tipoevento, datahora, localizacao, idorganizador} = request.body

  // console.log("aaa" + tipoevento)
  // console.log("aaa" + datahora)
  // console.log("aaa" + localizacao)
  // console.log("aaa" + idorganizador)

  pool.query(
    'insert into CrowdMeet.evento (tipoevento, datahora, localizacao, idorganizador) values ($1, $2, $3, $4) returning *',
    [tipoevento, datahora, localizacao, idorganizador],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      //response.status(201).json({status: 'success', message: 'Evento adicionado.'})
    },
  )
}

const deleteEvento = (request, response) => {
  const {id} = request.body
  pool.query('delete from CrowdMeet.Evento e using CrowdMeet.Participantes p where p.evento = $1 and e.id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({status: 'success', message: 'Evento apagado.'})
  })
  // pool.query('delete from CrowdMeet.Participantes where evento = $1', [id], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  // })
  // pool.query('DELETE FROM CrowdMeet.Evento where id = $1', [id], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  // })
}

app.delete("/eventoid/:id", (request, response) => {
  const {id} = request.params
  //pool.query('delete from CrowdMeet.Evento e using CrowdMeet.Participantes p where p.evento = $1 and e.id = $1', [id], (error, results) => {
  pool.query('delete from CrowdMeet.Evento where id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({status: 'success', message: 'Evento apagado.'})
  })
})

app.delete("/participantesevento/:id", (request, response) => {
  const {id} = request.params
  pool.query('delete from CrowdMeet.participantes where evento = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({status: 'success', message: 'Evento apagado.'})
  })
})

const getEvento = (request, response) => {
  const {id} = request.body
  if(id == null){
    pool.query('SELECT * FROM CrowdMeet.Evento', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else{
    pool.query('SELECT * FROM CrowdMeet.Evento where id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const updateEvento = (request, response) => {
  const {id, localizacao, datahora, tipoevento} = request.body
  pool.query('update CrowdMeet.evento set ' + 
  'localizacao = $1, tipoevento = $2, datahora = $3 where id = $4',
  [localizacao, tipoevento, datahora, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200)
  })
}

const getLocalizacao = (request, response) => {
  const {id} = request.body
  if(id == null){
    pool.query('SELECT * FROM CrowdMeet.Localizacao', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else{
    pool.query('SELECT * FROM CrowdMeet.Localizacao where id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}


const getTipo = (request, response) => {
  const {id} = request.body
  if(id == null){
    pool.query('SELECT * FROM CrowdMeet.Tipoevento', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else{
    pool.query('SELECT * FROM CrowdMeet.Tipoevento where id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

// const getSubtipo = (request, response) => {
//   const {id} = request.body
//   if(id == null){
//     pool.query('SELECT * FROM CrowdMeet.Subtipoevento', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }
//   else{
//     pool.query('SELECT * FROM CrowdMeet.Subtipoevento where id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }
// }

const getDepartamento = (request, response) => {
  const {id} = request.body
  if(id == null){
    pool.query('SELECT * FROM CrowdMeet.Departamento', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else{
    pool.query('SELECT * FROM CrowdMeet.Departamento where id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const getParticipante = (request, response) => {
  const {evento, funcionario} = request.body
  if(evento != null){
    pool.query('SELECT * FROM CrowdMeet.Participantes where evento = $1', [evento], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else if(funcionario != null){
    pool.query('SELECT * FROM CrowdMeet.Participantes where funcionario = $1', [funcionario], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else{
    pool.query('SELECT * FROM CrowdMeet.Participantes', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const addParticipante = (request, response) => {
  const {evento, funcionario} = request.body
  pool.query(
    'insert into CrowdMeet.participantes (evento, funcionario) values ($1, $2)',
    [evento, funcionario],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Participante adicionado.'})
    },
  )
}

app.route('/funcionarios').get(getFuncionario)

app.route('/eventos').post(addEvento).get(getEvento).delete(deleteEvento).put(updateEvento)

app.route('/localizacao').get(getLocalizacao)

app.route('/participante').get(getParticipante).post(addParticipante)

app.route('/tipo').get(getTipo)

// app.route('/subtipo').get(getSubtipo)

app.route('/departamento').get(getDepartamento)

// Start server
app.listen(process.env.PORT || 3002,  () => {
  console.log(`Server listening`)
})