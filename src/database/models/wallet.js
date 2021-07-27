'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" })
    }
    toJson(){
      return { ...this.get(), id:undefined} // remove ID from object
    }
  };
  Wallet.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    privateKey:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    mnemonic:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
  }, {
    sequelize,
    tableName:"wallet",
    modelName: 'Wallet',
  });
  return Wallet;
};