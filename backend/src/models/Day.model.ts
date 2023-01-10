import { model, Schema } from "mongoose";

export interface Day {
    id:string;
    day:string;
    desc:string;
    weight: number;
    reps:number;
}

export const DaySchema = new Schema<Day>(
    {
        day: {type:String, required:true},
        desc: {type:String, required:true},
        weight: {type:Number, required:true},
        reps: {type:Number, required:true},
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const DayModel = model<Day>('day',DaySchema);