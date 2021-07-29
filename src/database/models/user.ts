import { Model } from 'sequelize';

import { User as UserType } from '../../constants/types'

'use strict';
module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserType> 
  implements UserType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number;
    uuid!: string;
    uname!: string;
    email!: string;
    passwd!: string;

    static associate(models: any) {
      // define association here
      User.hasOne(models.Wallet, {constraints: false})
    }
    toJson(){
      return { ...this.get(), id:undefined} // remove ID from object
    }
  };
  User.init({
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