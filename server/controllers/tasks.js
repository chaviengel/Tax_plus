const db = require("../models/index");
const Task = db.tasks
const { Op } = require("sequelize");

const concatForWhere = (wh, attribute_key, attribute_value) => {
  if (attribute_value)

    wh[attribute_key] = attribute_value;

}

class TasksController {
  getDailyTasks = async (req, res) => {
    if (req.body.worker == 1)
      res.send(await Task.findAll({
        where: { date: new Date(req.body.date) }, include: [
          {
            model: db.task_status_type,
            artributes: ["description"]
          },
          {
            model: db.workers,
            artributes: ["full_name"]
          }
        ],
        raw: true
      }))
    else
      res.send(await Task.findAll({ where: { worker_id: req.body.worker, date: new Date(req.body.date) }, include: { model: db.task_status_type, artributes: ["description"] }, raw: true }))
  }
  tasksFilter = async (req, res) => {
    let wh = {};
    concatForWhere(wh, "worker_id", req.body.actor);
     concatForWhere(wh, "date",new Date(req.body.date) );
    //*wh['date']=new Date(req.body.date)
    concatForWhere(wh, "task_status_typeId", req.body.status);
    const qry = {};
    qry.where = wh;
    console.log('wh', wh);
    res.send(await Task.findAll(qry));
  }
 
  addTask = async (req, res) => {
    await Task.create(req.body);
    res.send("addTask")
  }
  updateTask = async (req, res) => {
    await Task.update(req.body, {
      where: { task_id: req.params.id }
    })
    res.send("updateTask")
  }
  deleteTask = async (req, res) => {
    const id = req.params.id
    await Task.destroy({ where: { task_id: id } })
  }

}

const tasksController = new TasksController()
module.exports = tasksController


