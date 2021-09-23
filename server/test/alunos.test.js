const axios = require('axios')
const alunosService = require('../service/alunosService')

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Should get alunos', async function () {
    const response = await request('http://localhost:8080/v1/alunos', 'get')
    expect(response.status).toBe(200)
    expect(response.data).toHaveLength(31)
})

test('Should get aluno pelo ID', async function () {
    const response = await request(`http://localhost:8080/v1/alunos/${1}`, 'get')
    expect(response.status).toBe(200)
    expect(response.data.tx_nome).toBe('Teste')
})

test('Should save aluno', async function () {
    const data = {tx_nome: 'José', tx_sexo: 'm', dt_nascimento: '2020-02-03'}
    const response = await request('http://localhost:8080/v1/alunos', 'post', data)
    expect(response.status).toBe(201)
    const aluno = response.data
    expect(aluno.tx_nome).toBe(data.tx_nome)
    expect(aluno.tx_sexo).toBe(data.tx_sexo)
    await alunosService.deleteAluno(aluno.id_aluno)
})

test('Should not save aluno', async function () {
    const data = {tx_nome: '', tx_sexo: '', dt_nascimento: ''}
    const response = await request('http://localhost:8080/v1/alunos', 'post', data)
    expect(response.status).toBe(204)
})

test('Should update alunos', async function () {
    const data = {tx_nome: 'José', tx_sexo: 'm', dt_nascimento: '2020-02-03'}
    const response = await request('http://localhost:8080/v1/alunos', 'post', data)
    const aluno = response.data
    id = aluno.id_aluno

    const alunoAlteracao = {id_aluno: id, tx_nome: 'Maria Silva', tx_sexo: 'f', dt_nascimento: '2020-02-03'}

    const newResponse = await request(`http://localhost:8080/v1/alunos/${id}`, 'put', alunoAlteracao)
    expect(newResponse.status).toBe(201)

    const updatedAluno = await alunosService.getAluno(id)
    expect(updatedAluno.tx_nome).toBe(alunoAlteracao.tx_nome)
    expect(updatedAluno.tx_sexo).toBe(alunoAlteracao.tx_sexo)
    await alunosService.deleteAluno(updatedAluno.id_aluno)
})

test.only('Should not update alunos', async function () {
    const alunoAlteracao = {id: 0}
    const newResponse = await request(`http://localhost:8080/v1/alunos/${alunoAlteracao.id}`, 'put', alunoAlteracao)
    expect(newResponse.status).toBe(204)
})

test('Should delete alunos', async function () {
    const data = {tx_nome: 'José', tx_sexo: 'm', dt_nascimento: '2020-02-03'}
    const response = await request('http://localhost:8080/v1/alunos/', 'post', data)
    const aluno = response.data
    id = aluno.id_aluno

    const newResponse = await request(`http://localhost:8080/v1/alunos/${id}`, 'delete')
    expect(newResponse.status).toBe(204)

    const alunos = await alunosService.getAlunos()
    expect(alunos).toHaveLength(31)
})