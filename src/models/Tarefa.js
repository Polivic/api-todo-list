const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const STATUS_PERMITIDOS = ['a fazer', 'em andamento', 'concluída'];

const Tarefa = sequelize.define('Tarefa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'titulo não pode ser vazio' } }
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'a fazer',
    validate: {
      isIn: {
        args: [STATUS_PERMITIDOS],
        msg: `Status inválido. Use um destes: ${STATUS_PERMITIDOS.join(', ')}`
      }
    }
  }
}, {
  tableName: 'tarefas',
  timestamps: true
});

module.exports = { Tarefa, STATUS_PERMITIDOS };
