const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Social_security_ststus=sequelize.define('social_security_ststus',{
        social_security_ststus_id:
        {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

       
    costumer_business_details_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
       
    from_date: { type: DataTypes.DATE, allowNull: false },
    until_date: { type: DataTypes.DATE, allowNull: false },
    ss_status_type: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
     

    },
    {
        freezeTableName:true,
        timestamps: false,
    });
    return Social_security_ststus;
}