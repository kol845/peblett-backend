'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Wallet }) {
      // define association here
      this.hasOne(Wallet, { foreignKey: 'userId' })
    }
    toJson(){
      return { ...this.get(), id:undefined} // remove ID from object
    }
  };
  User.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    uname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    passwd: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:"user",
    modelName: 'User',
  });
  return User;
};