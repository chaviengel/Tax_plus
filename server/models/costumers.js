const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Costumer=sequelize.define('costumers',{
        costumer_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id:
    {
        type:DataTypes.INTEGER,
        allowNull: false
    },
       
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        full_name:{ type: DataTypes.STRING, allowNull: false },
        
        is_active:DataTypes.TINYINT,

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return Costumer;
}