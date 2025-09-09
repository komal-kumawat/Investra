import mongoose from "mongoose";

interface IPositions extends Document{
    name:string;
    quantity:number;
    price:number;
    avg:number;
    net:string;
    day:string;
    product:string;
    isLoss:boolean;
}

const PositionsSchema = new mongoose.Schema<IPositions>({
    name:{type:String, required:true},
    quantity:{type:Number , required:true},
    price:{type:Number , required:true},
    avg:{type:Number , required:true},
    net:{type:String, required:true},
    day:{type:String, required:true},
    product:{type:String , required:true},
    isLoss:{type:Boolean , default:false}

})
const PositionsModel = mongoose.model<IPositions>("PositionsModel" ,PositionsSchema);
export default PositionsModel;