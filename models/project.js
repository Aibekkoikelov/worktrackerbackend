'use strict';

const db = require('./index');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
   
    static associate(models) {
      Project.belongsTo(models.Client)
    }
  }
  Project.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });

  return Project;
};