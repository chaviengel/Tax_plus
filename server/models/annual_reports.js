const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Annual_report = sequelize.define('annual_reports',
        {
            annual_report_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            
            report_subtypeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            
            year: { type: DataTypes.INTEGER,allowNull: false},

            material_submission_date: { type: DataTypes.DATE},
            appeal1_date: { type: DataTypes.DATE},
            appeal2_date: { type: DataTypes.DATE},
            appeal3_date: { type: DataTypes.DATE},

            customer_approval_date: { type: DataTypes.DATE},
            broadcast_date: { type: DataTypes.DATE},
            authorities_approval_date: { type: DataTypes.DATE},
            
            payment_date: { type: DataTypes.DATE},
        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Annual_report;
}