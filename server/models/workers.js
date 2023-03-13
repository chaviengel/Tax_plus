const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Worker = sequelize.define('workers',
        {
            worker_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            
            
            id: { type: DataTypes.STRING,allowNull: false},
            first_name: { type: DataTypes.STRING,allowNull: false},
            last_name: { type: DataTypes.STRING,allowNull: false},
            full_name:{ type: DataTypes.STRING, allowNull: false },

            address: { type: DataTypes.STRING},
            phone_1: { type: DataTypes.STRING,allowNull: false},

            phone_2: { type: DataTypes.STRING},
            email: { type: DataTypes.STRING},
            office_mail: { type: DataTypes.STRING,allowNull: false},
            password: { type: DataTypes.STRING,allowNull: false},

            class_typeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true }

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Worker;
}