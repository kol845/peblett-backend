import { DataTypes } from 'sequelize'
'use strict';
const up = async (queryInterface:any, Sequelize:any) => {
  await queryInterface.createTable('wallet', {
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
    address:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    walletObj:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },  
    userId:{
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
  await queryInterface.dropTable('wallet');
}

export default { up, down };