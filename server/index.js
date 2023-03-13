const express =require("express");
const cron = require('node-cron');
require("dotenv").config()

const RemindersController=require('./services/Reminders')
const updatesController=require('./services/updates')

const usersRouter =require ("./routes/users.js")
const workersRouter =require ("./routes/workers.js")
const attendanceRouter =require ("./routes/attendance.js")
const tasksRouter =require ("./routes/tasks.js")
const costumersRouter =require ("./routes/costumers.js")
const costumersPersonalDetailsRouter =require ("./routes/costumersPersonalDetails.js")
const costumersBusinessDetailsRouter =require ("./routes/costumersBusinessDetails.js")
const monthlyReportsRouter=require("./routes/monthlyReports")
const monthlyDeductionsRouter=require("./routes/monthlyDeductions")
const annualReportsRouter=require("./routes/annualReports")
const capitalsDeclarationRouter=require("./routes/capitalsDeclaration")
const correspondencesRouter=require("./routes/correspondences")
const filesCostumersRouter=require("./routes/filesCostumers")
const generalFilesRouter=require("./routes/generalFiles")
const workersCostumersRouter=require("./routes/workersCostumers")  
const reportsSubmissionDatesRouter=require("./routes/reportsSubmissionDates")  
const costumersSettingsRouter=require("./routes/CostumersSettings")  
const getTablesRouter=require("./routes/getTables")
const PadditionalPofessionsRouter=require("./routes/PadditionalPofessions")
const PchildrensYearsOfBirthRouter=require("./routes/PchildrensYearsOfBirth")
const PContactsRouter=require("./routes/PContacts")
const PSocialSecurityStatusRouter=require("./routes/PSocialSecurityStatus")
const reminders1=require('./routes/reminders1')

const app = express();
app.use(express.json())
app.use(express.urlencoded())


    app.use("/users",usersRouter)
    app.use("/workers",workersRouter)
    app.use("/attendance",attendanceRouter)
    app.use("/tasks",tasksRouter)
    app.use("/costumers",costumersRouter)
    app.use("/costumersPersonalDetails",costumersPersonalDetailsRouter)
    app.use("/costumersBusinessDetails",costumersBusinessDetailsRouter)
    app.use("/monthlyReports",monthlyReportsRouter)
    app.use("/monthlyDeductions",monthlyDeductionsRouter)
    app.use("/annualReports",annualReportsRouter)
    app.use("/capitalsDeclaration",capitalsDeclarationRouter)
    app.use("/correspondences",correspondencesRouter)
    app.use("/filesCostumers",filesCostumersRouter)
    app.use("/generalFiles",generalFilesRouter)
    app.use("/workersCostumers",workersCostumersRouter)
    app.use("/reportsSubmissionDates",reportsSubmissionDatesRouter)
    app.use("/costumersSettings",costumersSettingsRouter)
    app.use("/getTables",getTablesRouter)
    app.use("/PadditionalPofessions",PadditionalPofessionsRouter)
    app.use("/PchildrensYearsOfBirth",PchildrensYearsOfBirthRouter)
    app.use("/PContacts",PContactsRouter)
    app.use("/PSocialSecurityStatus",PSocialSecurityStatusRouter)
    app.use('/reminders1',reminders1)

    app.all('*', (req, res) => {
      res.status(404)
      if (req.accepts('json')) 
      {
          res.json({ message: '404 Not Found' })
      } 
      else
      {
          res.type('txt').send('404 Not Found')
      }
  })



// Schedule the function to run every day at 8:30
cron.schedule('30 8 * * *', RemindersController.sendReminders); 
// Schedule the function to run every month
cron.schedule('0 7 1 * *', updatesController.updateMonthlyReports); 
cron.schedule('0 7 1 * *', updatesController.updateMonthlyDeductions); 
// Schedule the function to run every year
cron.schedule('0 7 1 1 *', updatesController.updateAnnualReports); 




app.listen("4000", () => {
     console.log("app running");
 });


//  MIN     Minute field    0 to 59
//  HOUR    Hour field      0 to 23
//  DOM     Day of Month    1-31
//  MON     Month field     1-12
//  DOW     Day Of Week     0-6
//  CMD     Command     Any command to be executed.





 