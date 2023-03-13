const workersCostumersController=require("../controllers/workersCostumers")
const createFolder=require("../services/folder")
const db = require("../models/index");
const Costumer= db.costumers;


class CostumersController {
    getCostumers=async(worker)=>
    {
        let data
        if (worker==1)
            data=await Costumer.findAll({where: {is_active:1}})
        else
        data = await Costumer.findAll({
            where: {is_active:1},
            include    : [
                { 
                    model: db.workers_costumers, 
                    attributes:[],
                    where: {worker_id:worker}
                }   
            ],
            raw:true,
        })
        return data;
    }
    getAllCostumers =async (req, res)=>{
            res.send(await Costumer.findAll())
    }
    
    getActiveCostumersByWorker =async (req, res)=>{
        if (req.params.worker==1)
            res.send(await Costumer.findAll())
        else
        {
            res.send(await this.getCostumers(req.params.worker))
        }
    }
    getCostumerById=async (req, res)=>{
        res.send(await Costumer.findAll({where: {costumer_id:req.params.id}}))
    }
    addCostumer =async(req, res)=>{
        const full_name=req.body.full_name
        let data=await Costumer.findAll({where: {full_name:full_name}})
        if(data[0]!=null)
            res.send("this name already exist")
        else
        {
        await Costumer.create(req.body);
        const path1="C:/מסמכים/לקוחות"
        createFolder(path1,full_name)
        const path2="C:/מסמכים/לקוחות"+"/"+full_name
        createFolder(path2,"חשבוניות מס")
        res.send("addCostumer")
    }
    }
    updateCostumer =async(req, res)=>{

        await Costumer.update(req.body, {
        where: { costumer_id: req.params.id }
      })
        res.send("updateCostumers")
    }

   
}


const costumersController=new CostumersController()
module.exports=costumersController

