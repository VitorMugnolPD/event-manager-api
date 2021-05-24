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
  const {tipo, subtipo, datahora, localizacao, idOrganizador} = request.body

  pool.query(
    'insert into CrowdMeet.evento (tipoevento, subtipo, datahora, localizacao, idOrganizador) values ($1, $2, $3, $4, $5)',
    [tipo, subtipo, datahora, localizacao, idOrganizador],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Evento adicionado.'})
    },
  )
}

const deleteEvento = (request, response) => {
  const {id} = request.body
  // pool.query('delete from CrowdMeet.Evento e using CrowdMeet.Participantes p where p.evento = $1 and e.id = $1', [id], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(201).json({status: 'success', message: 'Evento adicionado.'})
  // })
  pool.query('delete from CrowdMeet.Participantes where evento = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
  })
  pool.query('DELETE FROM CrowdMeet.Evento where id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
  })
}

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
  const {id, localizacao, datahora, tipoevento, subtipo, idorganizador} = request.body
  pool.query('update CrowdMeet.evento set ' + 
  'localizacao = $1, tipoevento = $2, subtipo = $3, datahora = $4 where id = $5',
  [localizacao, tipoevento, subtipo, datahora, id], (error, results) => {
    if (error) {
      throw error
    }
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

const getSubtipo = (request, response) => {
  const {id} = request.body
  if(id == null){
    pool.query('SELECT * FROM CrowdMeet.Subtipoevento', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else{
    pool.query('SELECT * FROM CrowdMeet.Subtipoevento where id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

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

app.route('/subtipo').get(getSubtipo)

app.route('/departamento').get(getDepartamento)

// Start server
app.listen(process.env.PORT || 3002,  () => {
  console.log(`Server listening`)
})