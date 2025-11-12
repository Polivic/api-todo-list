const { Tarefa, STATUS_PERMITIDOS } = require('../models/Tarefa');

async function criar(req, res) {
  try {
    const { titulo, descricao, status } = req.body;

    if (!titulo) {
      return res.status(400).json({ erro: 'O campo título é obrigatório.' });
    }

    if (status && !STATUS_PERMITIDOS.includes(status)) {
      return res.status(400).json({
        erro: `Status inválido. Use um destes: ${STATUS_PERMITIDOS.join(', ')}`
      });
    }

    const tarefa = await Tarefa.create({ titulo, descricao, status });
    return res.status(201).json({
      message: 'Tarefa criada com sucesso!',
      tarefa
    });
  } catch (e) {
    return res.status(400).json({ erro: e.message });
  }
}

async function listar(req, res) {
  const tarefas = await Tarefa.findAll({ order: [['id', 'ASC']] });
  return res.status(200).json(tarefas);
}

async function buscarPorId(req, res) {
  const { id } = req.params;
  const tarefa = await Tarefa.findByPk(id);

  if (!tarefa) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  return res.status(200).json(tarefa);
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    if (status && !STATUS_PERMITIDOS.includes(status)) {
      return res.status(400).json({
        erro: `Status inválido. Use um destes: ${STATUS_PERMITIDOS.join(', ')}`
      });
    }

    await tarefa.update({ titulo, descricao, status });
    return res.status(200).json({
      message: 'Tarefa atualizada com sucesso!',
      tarefa
    });
  } catch (e) {
    return res.status(400).json({ erro: e.message });
  }
}

async function atualizarStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!STATUS_PERMITIDOS.includes(status)) {
    return res.status(400).json({
      erro: `Status inválido. Use um destes: ${STATUS_PERMITIDOS.join(', ')}`
    });
  }

  const tarefa = await Tarefa.findByPk(id);
  if (!tarefa) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  tarefa.status = status;
  await tarefa.save();

  return res.status(200).json({
    message: 'Status da tarefa atualizado com sucesso!',
    tarefa
  });
}

async function deletar(req, res) {
  const { id } = req.params;
  const tarefa = await Tarefa.findByPk(id);

  if (!tarefa) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  await tarefa.destroy();
  return res.status(200).json({ message: 'Tarefa deletada com sucesso!' });
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  atualizarStatus,
  deletar
};
