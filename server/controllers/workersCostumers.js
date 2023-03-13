const db = require("../models/index");
const Worker_costumer= db.workers_costumers

class WorkersCostumersController {
    getWorkerByCostumer =async(req, res)=>{
      res.send(await Worker_costumer.findAll({ where: { costumer_id: req.params.costumer } 
        ,include:{model:db.workers,artributes:["full_name"]},raw:true}))
    }
    
    getCostumersByWorker =async(workerId)=>{
      res.send( await Worker_costumer.findAll({ where: { worker_id: workerId } }))
    }
    
    addWorkersCostumer =async (req, res)=>{
        await Worker_costumer.create(req.body); 
        res.send("addWorkersCostumer")
    }
    updateCostumerById =async(req, res)=>{
        res.send("updateCostumerById")
    }
}
const workersCostumersController=new WorkersCostumersController()
module.exports=workersCostumersController


