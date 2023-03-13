const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Children_year_of_birth=sequelize.define('childrens_years_of_birth',{
        year_of_birth_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    costumer_business_details_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
       
    year: { type: DataTypes.INTEGER, allowNull: false }
       

     

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return Children_year_of_birth;
}