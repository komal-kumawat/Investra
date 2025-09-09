import mongoose from "mongoose";

interface IOrders extends Document{
    name:string;
    quantity:number;
    price:number;
    mode:string;
}

const OrdersSchema = new mongoose.Schema<IOrders>({
    name:{type:String, required:true},
    quantity:{type:Number , required:true},
    price:{type:Number , required:true},
    mode:{type:String , required:true}

})
const OrdersModel = mongoose.model<IOrders>("OrdersModel" , OrdersSchema );
export default OrdersModel;