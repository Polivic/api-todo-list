const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefaController');

router.post('/tarefas', controller.criar);
router.get('/tarefas', controller.listar);
router.get('/tarefas/:id', controller.buscarPorId);
router.put('/tarefas/:id', controller.atualizar);
router.patch('/tarefas/:id/status', controller.atualizarStatus);
router.delete('/tarefas/:id', controller.deletar);

module.exports = router;
