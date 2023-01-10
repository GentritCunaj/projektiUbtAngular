import { Router } from "express";
import { sample_exc } from "../data";
import asyncHandler from "express-async-handler";
import { DayModel} from '../models/Day.model';
import bodyParser from "body-parser";
const router = Router();
router.use(bodyParser())
router.get("/seed",asyncHandler( 
    async (req,res)=>{
        const excCount = await DayModel.countDocuments();
        if (excCount > 0){
            res.send("seed is already done");
            return
        }

        await DayModel.create(sample_exc);
        res.send("seed is done")
        
    }
))

router.get("/",asyncHandler(
    async (req,res)=>{
        
        const exc = await DayModel.find();
        
        res.send(exc)
    }
))

router.post("/",asyncHandler(
    async(req,res)=>{
        
        let result = await DayModel.create(req.body);
        res.send(result)
        
    }
))

router.delete("/:id", asyncHandler(
    async(req,res)=>{
        const del = await DayModel.findByIdAndDelete(req.params.id);
        res.send(del);
    }
))
export default router;