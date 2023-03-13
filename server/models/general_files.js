const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const General_file = sequelize.define('general_files',
        {
            general_file_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            
            name: { type: DataTypes.STRING,allowNull: false},
            file_subtype: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            path: { type: DataTypes.STRING,allowNull: false},
            create_date: { type: DataTypes.DATE, allowNull: false }

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return General_file;
}