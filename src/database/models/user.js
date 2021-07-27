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
      this.hasOne(Wallet, { foreignKey: 'userId', as:'wallets' })
    }
    toJson(){
      return { ...this.get(), id:undefined} // remove ID from object
    }
  };
  User.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    uname: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
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