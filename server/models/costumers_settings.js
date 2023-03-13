const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Costumer_setting=sequelize.define('costumers_settings',{
        costumer_setting_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
       
    report_subtypeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
    report_frequency_typeId: { type: DataTypes.INTEGER,foreignKey: true },
    payment_method_typeId: { type: DataTypes.INTEGER, foreignKey: true },
       

     

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return Costumer_setting;
}