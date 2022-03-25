'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
  
    static associate(models) {
    
    }
  }
  Teams.init({
    TeamName: DataTypes.STRING,
    Company: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teams',
  });
  return Teams;
};