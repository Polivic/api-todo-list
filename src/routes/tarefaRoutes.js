const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefaController');

router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.patch('/:id/status', controller.atualizarStatus);
router.delete('/:id', controller.deletar);

module.exports = router;
