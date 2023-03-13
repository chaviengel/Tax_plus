const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Contact=sequelize.define('contacts',{
        Contact_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

       
    costumer_business_details_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
       
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }
      
     

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return Contact;
}