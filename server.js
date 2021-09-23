// npm install express body-parser pg-promise jest axios
// npm install pg-promise

const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/v1/', require('./server/route/alunosRoute'))
app.use(function(error, req, res, next) {
    if (error.message === 'Aluno already exists') {
        return res.status(409).send(error.message)
    }
    if (error.message === 'Aluno not found') {
        return res.status(404).send(error.message)
    }
    if (error.message === 'Aluno not saved') {
        return res.status(204).send(error.message)
    }
    if (error.message === 'Aluno not updated') {
        return res.status(204).send(error.message)
    }
    res.status(500).send(error.message)
})

app.listen(8080);