const db = require("../models/index");
const Worker= db.workers
//const Class_type=db.class_type


class WorkersController {
    getAllWorkers = async(req, res)=>{
      
      var data = await Worker.findAll(
        {
            //artributes:["firstName","lastName"],
            include:[
                {
                    model:db.class_type,
                    artributes:["description"]
                }   
            ],
            raw:true
        }
    )
        res.send(data)
    } 
    getWorkerById =async (req, res)=>{
      const id = req.params.id; 
      await Worker.findByPk(id,            {include:[
        {
            model:db.class_type,
            artributes:["description"]
        }   
    ]},
    {raw:true})

    }
    addWorker =async (req, res)=>{
      
        let data=await Worker.findAll({where: {full_name:req.body.full_name}})
        if(data[0]!=null)
            res.send("this name already exist")
        else
        {
        await Worker.create(req.body);
       res.send("addWorker")}
    }
    updateWorker =async (req, res)=>{
      await Worker.update(req.body, {
            where: { worker_id: req.params.id }})
        res.send("updateWorker") 
    }
    deleteWorekr =async (req, res)=>{
        const id = req.params.id;
        await Worker.destroy({
          where: { worker_id: id }
        })  
    }
   
}



const workersController=new WorkersController()
module.exports=workersController

