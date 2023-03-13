
const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Additional_profession=sequelize.define('additional_professions',{
        additional_profession_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    costumer_business_details_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
       
    profession_owner_id: { type: DataTypes.INTEGER, allowNull: false },
       
    description: { type: DataTypes.STRING, allowNull: false }
     

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return Additional_profession;
}