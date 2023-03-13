const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Vat_assessor=sequelize.define('vat_assessors',{
        vat_assessor_id:
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
    return Vat_assessor;
}