const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Invoice_no = sequelize.define('invoices_no',
        {
            invoice_no_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            name: { type: DataTypes.STRING, allowNull: false,foreignKey: true },
            payment_date: { type: DataTypes.DATE, allowNull: false},
            payment_method_type: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            path: { type: DataTypes.STRING, allowNull: false}
            


        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Invoice_no;
}