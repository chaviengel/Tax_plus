const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Task = sequelize.define('tasks',
        {
            task_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            worker_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            date: { type: DataTypes.DATE,allowNull: false},
            task_status_typeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },


            description: { type: DataTypes.STRING , allowNull: false},

            

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Task;
}