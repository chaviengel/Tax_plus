const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Reports_submission_date = sequelize.define('reports_submission_dates',
        {
            report_submission_date_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            report_type: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            
            month: { type: DataTypes.INTEGER, allowNull: false},
            year: { type: DataTypes.INTEGER, allowNull: false},
            submission_date: { type: DataTypes.DATE},


            



            
            

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Reports_submission_date;
}