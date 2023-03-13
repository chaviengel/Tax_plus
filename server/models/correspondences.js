const { DataTypes } = require("sequelize");
const { sequelize, officer } = require(".");


module.exports = (sequelize, DataTypes) => {//primary key
    const Correspondence = sequelize.define('correspondences',
        {
            correspondence_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            date: { type: DataTypes.DATE,allowNull: false},
            issue: { type: DataTypes.STRING},
            content: { type: DataTypes.STRING},
            correspondence_initiativeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },



            
            

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Correspondence;
}