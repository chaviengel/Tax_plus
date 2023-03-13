const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Monthly_deduction = sequelize.define('monthly_deductions',
        {
            monthly_deduction_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            
            report_subtypeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            month: { type: DataTypes.INTEGER,allowNull: false},
            year: { type: DataTypes.INTEGER,allowNull: false},

            material_submission_date: { type: DataTypes.DATE},
            customer_approval_date: { type: DataTypes.DATE},
            broadcast_date: { type: DataTypes.DATE},
            payment_date: { type: DataTypes.DATE},

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Monthly_deduction;
}