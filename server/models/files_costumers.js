const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const File_costumer = sequelize.define('files_costumers',
        {
            file_costumer_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            
            name: { type: DataTypes.STRING,allowNull: false},
            file_subtype: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            path: { type: DataTypes.STRING,allowNull: false},
            create_date: { type: DataTypes.DATE, allowNull: false }

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return File_costumer;
}