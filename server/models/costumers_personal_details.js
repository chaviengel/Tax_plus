const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Costumer_personal_details = sequelize.define('costumers_personal_details',
        {
            costumer_personal_details_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            costumer_id: { type: DataTypes.INTEGER, allowNull: false,foreignKey: true },
            //urgency: { type: DataTypes.TINYINT, defaultValue: 0 },//default
            
            address: { type: DataTypes.STRING},
            email: { type: DataTypes.STRING},
            phone_1: { type: DataTypes.STRING,allowNull: false},
            phone_2: { type: DataTypes.STRING,allowNull: false},

            phone_3: { type: DataTypes.STRING},

            sms_phone: { type: DataTypes.STRING},
            whatsapp_phone: { type: DataTypes.STRING},
            birth_date: { type: DataTypes.DATE, allowNull: false },
            partner_id: { type: DataTypes.STRING},
            partner_birth_date: { type: DataTypes.DATE},

            is_credit_points_rejection: { type: DataTypes.TINYINT},
            bank_number: { type: DataTypes.BIGINT},
            branch_number: { type: DataTypes.BIGINT},

            account_number: { type: DataTypes.BIGINT},
            path: { type: DataTypes.STRING,allowNull: false},

        },
        {
            freezeTableName:true,
            timestamps: false,
        });
    return Costumer_personal_details;
}