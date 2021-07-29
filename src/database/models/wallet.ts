import { Model } from 'sequelize';

import { Wallet as WalletType } from '../../constants/types'


'use strict';
module.exports = (sequelize:any, DataTypes:any) => {
  class Wallet extends Model<WalletType> 
  implements WalletType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number;
    uuid!: string;
    privateKey!: string;
    mnemonic!: string;
    static associate(models: any) {
      // define association here
      Wallet.belongsTo(models.User, {constraints: false})
    }
    toJson(){
      return { ...this.get(), id:undefined} // remove ID from object
    }
  };
  Wallet.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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