import mongoose from "mongoose";

interface Iholding extends Document{
    name:string;
    quantity:number;
    price:number;
    avg:number;
    net:string;
    day:string;
}

const HoldingSchema = new mongoose.Schema<Iholding>({
    name:{type:String, required:true},
    quantity:{type:Number , required:true},
    price:{type:Number , required:true},
    avg:{type:Number , required:true},
    net:{type:String, required:true},
    day:{type:String, required:true},

})
const HoldingsModel = mongoose.model<Iholding>("HoldingsModel" , HoldingSchema);
export default HoldingsModel;