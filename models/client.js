'use strict';

const db = require('./index');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
  
    static associate(models) {
      Client.hasMany(models.Project)
    }
  }
  Client.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });

  return Client;
};

