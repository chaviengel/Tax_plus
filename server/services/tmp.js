const request = require('request');
const db = require("../models/index");
const { indexOf } = require('inflection');
const sendEmail = require('./mailer');
const monthlyReportsController = require("../controllers/monthlyReports");
const { where } = require("sequelize");
const JSONTransport = require('nodemailer/lib/json-transport');
const Annual_report = db.annual_reports;
const Monthly_report = db.monthly_reports;
const Monthly_deduction = db.monthly_deductions;
const Report_submission_dates = db.reports_submission_dates

function downloadPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });
}
class RemindersController {

    readReminder = (req, res) => {
        console.log("h")
    }

    sendReminders = async (req, res) => {

        const today = new Date();
        const ty = today.getFullYear();
        const tm = today.getMonth() + 1;
        const td = today.getDate();
        const weekDay = today.getDay() + 1;

        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const yy = yesterday.getFullYear();
        const ym = yesterday.getMonth() + 1;
        const yd = yesterday.getDate();

        const reportsSubmissionDate = await Report_submission_dates.findAll({ where: { report_type: 2, month: m, year: y } })
        const reportsDate = reportsSubmissionDate[0].submission_date
        const deductionsSubmissionDate = await Report_submission_dates.findAll({ where: { report_type: 3, month: m, year: y } })
        const deductionsDate = deductionsSubmissionDate[0].submission_date

        const todayPath = "https://www.hebcal.com/converter?cfg=json&date=" + ty + "-0" + tm + "-0" + td + "&g2h=1&strict=1"
        const yesterdayPath = "https://www.hebcal.com/converter?cfg=json&date=" + yy + "-0" + ym + "-0" + yd + "&g2h=1&strict=1"
        
        let jewishToday= await downloadPage(todayPath)
        let jewishYesterday= await downloadPage(yesterdayPath)
        // JSON.parse
        res.send(jewishYesterday)

        const holydays = ['Purim', 'Pesach I']

        // if (weekDay in [1, 4]) {
        //             if (holydays.indexOf(jewishToday.events[0]) == -1) {
        //                 await sendMonthlyReportsReminders(reportsDate);
        //                 await sendMonthlyDeductionsReminders(deductionsDate);
        //             }
        //         }        
        // if (weekDay in [2, 5]) {
        //             if (holydays.indexOf(jewishYesterday.events[0]) > -1) {
        //                 await sendMonthlyReportsReminders(reportsDate);
        //                 await sendMonthlyDeductionsReminders(deductionsDate);
        //             }
        //         }
  
        // if (td in [1,2,3]) {
        //             if (td==1 && holydays.indexOf(jewishToday.events[0]) == -1) 
        //                 await AnnualReportsReminders();
        //             else if (td==2 && holydays.indexOf(jewishYesterday.events[0]) > -1) 
        //                 await AnnualReportsReminders();
        //            else if (td==3 )
        //         }
             
        }

    }


async function sendMonthlyReportsReminders(reportsDate) {
    if (new Date(reportsDate) > new Date()) {
        let data = await Monthly_report.findAll(
            {
                where: { month: m, year: y, material_submission_date: null },
                include:
                    [
                        { model: db.costumers_personal_details, artributes: ['email'] },
                        { model: db.report_subtype, artributes: ['description'] }
                    ]
            })
        data.forEach(r => {
            const to = r.dataValues["costumers_personal_detail"].dataValues.email;
            const subject = 'הגשת מסמכים לדוח החודשי';
            const body = `שלום וברכה, תזכורת עליך להגיש דו"ח ${r.dataValues['report_subtype'].dataValues.description} עד לתאריך ${reportsDate} נא העבר את החומר למשרדינו.`;

            sendEmail.sendEmail(to, subject, body)
                .then(info => {
                    console.log('Email sent: ', info.response);
                    res.send('Registration successful');
                })
                .catch(error => {
                    console.log('Error sending email: ', error);
                    res.status(500).send('Failed to send email');
                });

        });
    }
}
async function sendMonthlyDeductionsReminders(deductionsDate) {
    if (new Date(deductionsDate) > new Date()) {
        let data = await Monthly_deduction.findAll(
            {
                where: { month: m, year: y, material_submission_date: null },
                order: [['costumer_id']],
                include:
                    [
                        { model: db.costumers_personal_details, artributes: ['email'] },
                        { model: db.report_subtype, artributes: ['description'] }
                    ]
            })

        let num = 0
        let id = data[num]['costumer_id']

        data.forEach(r => {
            if ((data[num + 1] && data[num + 1]['costumer_id'] != id) || num + 1 == data.length) {
                const to = r.dataValues["costumers_personal_detail"].dataValues.email;
                const subject = 'הגשת מסמכים לנכויים החודשיים';
                const body = `Hello and greetings, a reminder that you must submit a ${r.dataValues['report_subtype'].dataValues.description}X report by ${reportsDate}. Please deliver the material to our offices.`
                sendEmail.sendEmail(to, subject, body)
                    .then(info => {
                        console.log('Email sent: ', info.response);
                        res.send('Registration successful');
                    })
                    .catch(error => {
                        console.log('Error sending email: ', error);
                        res.status(500).send('Failed to send email');
                    });
                console.log(id);

                if (data[num + 1])
                    id = data[num + 1]['costumer_id'];

            }
            num++;



        });
    }
}
async function sendAnnualReportsReminders() {
    p
}

const remindersController = new RemindersController()
module.exports = remindersController