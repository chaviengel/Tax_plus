const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Capital_declaration = sequelize.define('capitals_declaration',
        {
            capital_declaration_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            
            
            
            date: { type: DataTypes.STRING,allowNull: false},
            year: { type: DataTypes.INTEGER,allowNull: false},

            material_submission_date: { type: DataTypes.DATE},
            appeal1_date: { type: DataTypes.DATE},
            appeal2_date: { type: DataTypes.DATE},
            appeal3_date: { type: DataTypes.DATE},

            customer_approval_date: { type: DataTypes.DATE},
            broadcast_date: { type: DataTypes.DATE},
            acceptance_date: { type: DataTypes.DATE},
            

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Capital_declaration;
}