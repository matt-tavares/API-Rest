const alunosData = require('../data/alunosData')

exports.getAlunos = function () {
    return alunosData.getAlunos()
}

exports.getAluno = async function (id_aluno) {
    const aluno = await alunosData.getAluno(id_aluno)
    if (!aluno) throw new Error('Aluno not found')
    return aluno
}

exports.saveAluno = async function (aluno) {
    return alunosData.saveAluno(aluno)
    //if (!aluno1) throw new Error('Aluno not saved')
    //return aluno1
}

exports.updateAluno = async function (id_aluno, aluno) {
    await exports.getAluno(id_aluno)
    return alunosData.updateAluno(id_aluno, aluno)
}

exports.deleteAluno = function (id_aluno) {
    return alunosData.deleteAluno(id_aluno)
}
