const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Worker_costumer=sequelize.define('workers_costumers',{
        worker_costumer_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    worker_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
       
    costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
       

     

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return Worker_costumer;
}