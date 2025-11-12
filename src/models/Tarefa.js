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
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(...STATUS_PERMITIDOS),
    allowNull: false,
    defaultValue: 'a fazer'
  }
}, {
  tableName: 'tarefas',
  timestamps: true
});

module.exports = { Tarefa, STATUS_PERMITIDOS };
