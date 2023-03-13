const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Payment_method_type=sequelize.define('payment_method_type',{
        payment_method_type_id:
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
    return Payment_method_type;
}