const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const It_assessor=sequelize.define('it_assessors',{
        it_assessor_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

       
       
        description: { type: DataTypes.STRING, allowNull: false }
     

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return It_assessor;
}