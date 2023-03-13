const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Ss_branch=sequelize.define('ss_branches',{
        ss_branch_id:
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
    return Ss_branch;
}