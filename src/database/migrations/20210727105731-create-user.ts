import { DataTypes } from 'sequelize'
'use strict';
const up = async (queryInterface:any, Sequelize:any) => {
  await queryInterface.createTable('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
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
    wallet: {
      type:DataTypes.INTEGER,
      allowNull:true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
const down = async (queryInterface:any, Sequelize:any) => {
  await queryInterface.dropTable('user');
}
export default { up, down };