const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Attendance = sequelize.define('attendance',
        {
            attendance_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            worker_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            date: { type: DataTypes.DATE,allowNull: false},


            enter_time: { type: DataTypes.TIME},
            exit_time: { type: DataTypes.TIME},
            total_time: { type: DataTypes.DOUBLE},


            
            

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Attendance;
}