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




class RemindersController {

    readReminder = (req, res) => {
        console.log("h")
    }

    sendReminders = async (req, res) => {

        const today = new Date();
        const ty = today.getFullYear();
        let tm = (today.getMonth() + 1).toString();
        let td = (today.getDate()).toString();
        if (parseInt(tm) < 10) { tm = '0' + tm }
        if (parseInt(td) < 10) { td = '0' + td }

        const weekDay = today.getDay() + 1;
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const yy = yesterday.getFullYear();
        let ym = yesterday.getMonth() + 1;
        let yd = yesterday.getDate();
        if (parseInt(ym) < 10) { ym = '0' + ym }
        if (parseInt(yd) < 10) { yd = '0' + yd }


        const reportsSubmissionDate = await Report_submission_dates.findAll({ where: { report_type: 2, month: tm, year: ty } })
        const reportsDate = reportsSubmissionDate[0].submission_date
        const deductionsSubmissionDate = await Report_submission_dates.findAll({ where: { report_type: 3, month: tm, year: ty } })
        const deductionsDate = deductionsSubmissionDate[0].submission_date
        const annualReportsSubmissionDate = await Report_submission_dates.findAll({ where: { report_type: 1, year: ty } })
        const annualReportsDate = annualReportsSubmissionDate[0].submission_date

        res.send("hello")

        const todayPath = "https://www.hebcal.com/converter?cfg=json&date=" + ty + "-" + tm + "-" + td + "&g2h=1&strict=1"
        const yesterdayPath = "https://www.hebcal.com/converter?cfg=json&date=" + yy + "-" + ym + "-" + yd + "&g2h=1&strict=1"

        let jewishToday = JSON.parse(await downloadHebcalPage(todayPath))
        let jewishYesterday = JSON.parse(await downloadHebcalPage(yesterdayPath))

        const holydays1 = [`Rosh Hashana ${jewishToday.hy}`, 'Rosh Hashana II', 'Yom Kippur', 'Sukkot I', 'Shmini Atzeret', 'Pesach VII', 'Shavuot I']
        const holydays2 = [`Rosh Hashana ${jewishYesterday.hy}`, 'Rosh Hashana II', 'Yom Kippur', 'Sukkot I', 'Shmini Atzeret', 'Pesach VII', 'Shavuot I']

        if (([1, 4].includes(weekDay) && holydays1.indexOf(jewishToday.events[0]) == -1) ||
            ([2, 5].includes(weekDay) && holydays2.indexOf(jewishYesterday.events[0]) > -1)) {
            await sendMonthlyReportsReminders(deductionsDate, ty, parseInt(tm));
            await sendMonthlyDeductionsReminders(reportsDate, ty, parseInt(tm));
        }
        if ([1, 2, 3].includes(parseInt(td))) {
            if ((td == 1 && holydays1.indexOf(jewishToday.events[0]) == -1) ||
                (td == 2 && holydays2.indexOf(jewishYesterday.events[0]) > -1) ||
                (td == 3 && jewishYesterday["hebrew"].search('ג׳ בְּתִשְׁרֵי') == 0))
                await sendAnnualReportsReminders(annualReportsDate,ty);
        }

    }

}
sendMonthlyReportsReminders = async (reportsDate, ty, tm) => {
    if (new Date(reportsDate) > new Date()) {
        let data = await Monthly_report.findAll(
            {
                where: { month: tm, year: ty, material_submission_date: null },
                include:
                    [
                        { model: db.costumers_personal_details, artributes: ['email'] },
                        { model: db.report_subtype, artributes: ['description'] }
                    ]
            })
        data.forEach(r => {
            const to = r.dataValues["costumers_personal_detail"].dataValues.email;
            const subject = 'הגשת מסמכים לדו"ח החודשי';
            const subtype = r.dataValues['report_subtype'].dataValues.description;
            const body = ',שלום וברכה\n' + ' תזכורת: עליך להגיש דו"ח ' + subtype + ' עד לתאריך ' + reportsDate + '\n' + '.נא העבר את החומר למשרדינו'
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
sendMonthlyDeductionsReminders = async (deductionsDate, ty, tm) => {
    if (new Date(deductionsDate) > new Date()) {
        let data = await Monthly_deduction.findAll(
            {
                where: { month: tm, year: ty, material_submission_date: null },
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
                const subject = 'הגשת מסמכי המשכורות החודשיות';
                const body = ',שלום וברכה\n' + ' תזכורת: עליך להעביר חומר משכורות עד לתאריך ' + deductionsDate + '\n' + '.נא העבר את החומר למשרדינו'
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
sendAnnualReportsReminders = async (annualReportsDate,ty) => {
    let data = await Annual_report.findAll(
        {
            where: { year: ty, material_submission_date: null },
            include:
                [
                    { model: db.costumers_personal_details, artributes: ['email'] },
                    { model: db.report_subtype, artributes: ['description'] }
                ]
        })
    data.forEach(r => {
        const to = r.dataValues["costumers_personal_detail"].dataValues.email;
        const subject = 'הגשת מסמכים לדוח השנתי';
        const subtype = r.dataValues['report_subtype'].dataValues.description;
        const body = ',שלום וברכה\n' + ' תזכורת: עליך להגיש דו"ח ' + subtype + ' עד לתאריך ' + annualReportsDate + '\n' + '.נא העבר את החומר למשרדינו'
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


function downloadHebcalPage(url) {
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

const remindersController = new RemindersController()
module.exports = remindersController