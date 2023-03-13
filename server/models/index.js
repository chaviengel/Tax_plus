const dbConfig = require('../dbConfig/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');
const { foreign_key } = require('inflection');



const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.costumers = require('./costumers')(sequelize, DataTypes)
db.costumers_personal_details= require('./costumers_personal_details')(sequelize, DataTypes)
db.costumers_business_details= require('./costumers_business_details.js')(sequelize, DataTypes)
db.workers= require('./workers.js')(sequelize, DataTypes)
db.attendance= require('./attendance.js')(sequelize, DataTypes)
db.tasks= require('./tasks.js')(sequelize, DataTypes)
db.monthly_reports= require('./monthly_reports.js')(sequelize, DataTypes)
db.monthly_deductions= require('./monthly_deductions.js')(sequelize, DataTypes)
db.annual_reports= require('./annual_reports.js')(sequelize, DataTypes)
db.capitals_declaration=require('./capitals_declaration')(sequelize, DataTypes)
db.correspondences= require('./correspondences')(sequelize, DataTypes)
db.files_costumers= require('./files_costumers.js')(sequelize, DataTypes)
db.general_files= require('./general_files.js')(sequelize, DataTypes)
db.class_type= require('./class_type.js')(sequelize, DataTypes)
db.task_status_type= require('./task_status_type.js')(sequelize, DataTypes)
db.bookkeeping_type= require('./bookkeeping_type.js')(sequelize, DataTypes)
db.costumer_file_type= require('./costumer_file_type.js')(sequelize, DataTypes)
db.ss_status_type= require('./ss_status_type.js')(sequelize, DataTypes)
db.it_assessors= require('./it_assessors.js')(sequelize, DataTypes)
db.vat_assessors= require('./vat_assessors.js')(sequelize, DataTypes)
db.deductions_assessors= require('./deductions_assessors.js')(sequelize, DataTypes)
db.ss_branches= require('./ss_branches.js')(sequelize, DataTypes)
db.payment_method_type= require('./payment_method_type.js')(sequelize, DataTypes)
db.report_frequency_type= require('./report_frequency_type.js')(sequelize, DataTypes)
db.report_type= require('./report_type.js')(sequelize, DataTypes)
db.report_subtype= require('./report_subtype.js')(sequelize, DataTypes)
db.correspondence_initiative_type= require('./correspondence_initiative_type.js')(sequelize, DataTypes)
db.file_type= require('./file_type.js')(sequelize, DataTypes)
db.file_subtype= require('./file_subtype.js')(sequelize, DataTypes)
db.workers_costumers= require('./workers_costumers.js')(sequelize, DataTypes)
db.costumers_settings= require('./costumers_settings.js')(sequelize, DataTypes)
db.reports_submission_dates= require('./reports_submission_dates.js')(sequelize, DataTypes)
db.additional_professions= require('./additional_professions.js')(sequelize, DataTypes)
db.childrens_years_of_birth= require('./childrens_years_of_birth.js')(sequelize, DataTypes)
db.contacts= require('./contacts.js')(sequelize, DataTypes)
db.social_security_ststus= require('./social_security_ststus.js')(sequelize, DataTypes)
db.invoices_no= require('./invoices_no.js')(sequelize, DataTypes)



 db.workers.belongsTo(db.class_type,{ foreignKey:'class_typeId'});
 db.tasks.belongsTo(db.task_status_type,{ foreignKey:'task_status_typeId'});
 db.tasks.belongsTo(db.workers,{ foreignKey:'worker_id'});

 db.monthly_reports.belongsTo(db.costumers,{foreignKey:'costumer_id'})
 //db.monthly_reports.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})
 //db.annual_reports.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})
 //db.monthly_deductions.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})
db.correspondences.belongsTo(db.correspondence_initiative_type,{foreignKey:"correspondence_initiativeId"})
 
 db.capitals_declaration.belongsTo(db.costumers,{foreignKey:'costumer_id'})
 db.capitals_declaration.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})


 db.costumers.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})

 db.costumers_settings.belongsTo(db.report_subtype,{foreignKey:'report_subtypeId'} )
 db.costumers_settings.belongsTo(db.report_frequency_type,{foreignKey:'report_frequency_typeId'} )
 db.costumers_settings.belongsTo(db.payment_method_type,{foreignKey:'payment_method_typeId'} )
 
 db.costumers_business_details.belongsTo(db.costumers,{foreignKey:"costumer_id"})
 db.costumers_business_details.belongsTo(db.costumer_file_type,{foreignKey:"costumer_file_typeId"})
 db.costumers_business_details.belongsTo(db.it_assessors,{foreignKey:"it_assessor_id"})
 db.costumers_business_details.belongsTo(db.vat_assessors,{foreignKey:"vat_assessor_id"})
 db.costumers_business_details.belongsTo(db.deductions_assessors,{foreignKey:"deduction_assessor_id"})
 db.costumers_business_details.belongsTo(db.ss_branches,{foreignKey:"ss_branch_id"})
 db.costumers_business_details.belongsTo(db.bookkeeping_type,{foreignKey:"Bookkeeping_typeId"})
 db.costumers_business_details.belongsTo(db.workers,{foreignKey:"responsible_worker_id"})


 db.capitals_declaration.belongsTo(db.costumers,{foreignKey:'costumer_id'})
 db.attendance.belongsTo(db.workers,{foreignKey:'worker_id'})

db.monthly_reports.belongsTo(db.costumers,{foreignKey:'costumer_id'})
db.monthly_reports.belongsTo(db.report_subtype,{foreignKey:'report_subtypeId'})
db.monthly_reports.belongsTo(db.costumers_personal_details,{foreignKey:'costumer_id'})
db.monthly_reports.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})


db.monthly_deductions.belongsTo(db.costumers,{foreignKey:'costumer_id'})
db.monthly_deductions.belongsTo(db.report_subtype,{foreignKey:'report_subtypeId'})
db.monthly_deductions.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})
db.monthly_deductions.belongsTo(db.costumers_personal_details,{foreignKey:'costumer_id'})


db.annual_reports.belongsTo(db.costumers,{foreignKey:'costumer_id'})
db.annual_reports.belongsTo(db.report_subtype,{foreignKey:'report_subtypeId'})
db.annual_reports.belongsTo(db.workers_costumers,{foreignKey:'costumer_id'})


db.workers_costumers.belongsTo(db.workers,{foreignKey:'worker_id'})
 
 db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
module.exports = db
