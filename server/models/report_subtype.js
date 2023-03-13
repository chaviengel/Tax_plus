const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Report_subtype=sequelize.define('report_subtype',{
        report_subtype_id:
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
    return Report_subtype;
}