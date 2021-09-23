const express = require('express');
const router = express.Router();
const alunosService = require('../service/alunosService')

router.get('/alunos', async function (req, res, next) {
    try {
        const alunos = await alunosService.getAlunos()
        res.json(alunos)
    } catch (error) {
        next(error)
    }
});
router.get('/alunos/:id_aluno', async function (req, res, next) {
    const aluno = await alunosService.getAluno(req.params.id_aluno)
    res.json(aluno)
});
router.post('/alunos', async function (req, res, next) {
    const aluno = req.body
    try {
        const newAluno = await alunosService.saveAluno(aluno)
        res.status(201).json(newAluno)
    } catch (error) {
        error.message = 'Aluno not saved'
        next(error)
    }
});
router.put('/alunos/:id_aluno', async function (req, res, next) {
    const aluno = req.body
    try {
        await alunosService.updateAluno(req.params.id_aluno, aluno)
        res.status(201).end()
    } catch (error) {
        error.message = 'Aluno not updated'
        next(error)
    }
});
router.delete('/alunos/:id_aluno', async function (req, res, next) {
    try {
        await alunosService.deleteAluno(req.params.id_aluno)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
});

module.exports = router;