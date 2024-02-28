'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Note.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id:{
      type:DataTypes.INTEGER,
      references: {
          model: "Users",
          key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Note',
    tableName:"Notes",
  });
  return Note;
};