const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Costumer_business_details = sequelize.define('costumers_business_details',
        {
            costumer_business_details_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            //urgency: { type: DataTypes.TINYINT, defaultValue: 0 },//default
            name: { type: DataTypes.STRING,allowNull: false},
            address: { type: DataTypes.STRING,allowNull: false},
            email: { type: DataTypes.STRING},
            costumer_file_typeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            it_assessor_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            vat_assessor_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            deduction_assessor_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            ss_branch_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            file_number_it: { type: DataTypes.INTEGER, allowNull: false},
            file_number_vat: { type: DataTypes.INTEGER, allowNull: false},
            file_number_deductions: { type: DataTypes.INTEGER},
            

            file_opening_date: { type: DataTypes.DATE, allowNull: false },
            Bookkeeping_typeId: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true},
            
            is_advance_iv: { type: DataTypes.TINYINT, allowNull: false,},

            books_management_instructions: { type: DataTypes.STRING},
            responsible_worker_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            
            
        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Costumer_business_details;
}