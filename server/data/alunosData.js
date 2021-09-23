const db = require('../infra/database')

exports.getAlunos = function () {
    return db.query(`SELECT * FROM production.aluno ORDER BY tx_nome ASC`)
}

exports.getAluno = function (id_aluno) {
    return db.oneOrNone(`SELECT * FROM production.aluno WHERE id_aluno = $1`, [id_aluno])
}

exports.saveAluno = function (aluno) {
    return db.one(
        `INSERT INTO production.aluno (tx_nome, tx_sexo, dt_nascimento)
        VALUES ($1, $2, $3) returning *`,
        [aluno.tx_nome, aluno.tx_sexo, aluno.dt_nascimento])
}

exports.updateAluno = function (id_aluno, aluno) {
    return db.none(`UPDATE production.aluno SET tx_nome = $1, tx_sexo = $2, dt_nascimento = $3 WHERE id_aluno = $4`,
    [aluno.tx_nome, aluno.tx_sexo, aluno.dt_nascimento, id_aluno])
}


exports.deleteAluno = function (id_aluno) {
    return db.none(
        `DELETE FROM production.aluno WHERE id_aluno = $1`
        ,[id_aluno])
}