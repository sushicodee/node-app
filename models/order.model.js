import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const shippingSchema ={
    address:{
        type:String,
        required:true,
    },
    city:{type:String,required:true},
    country:{type:String,required:true},
};

const paymentSchema = {
    paymentMethod : {type:String,required:true}
};

const orderItemSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{type:Number,required:true},
    image:{type:String},
    price:{type:Number,required:true},
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true,
    }
})

const orderSchema = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    orderItems:[orderItemSchema],
    shipping:shippingSchema,
    itemPrice:{type:Number},
    taxPrice:{type:Number},
    shippingPrice:{type:Number},
    totalPrice:{type:Number},
    isPaid:{type:Boolean ,default:false},
    paidAt:{type:Date},
    isDelivered:{type:Boolean,default:false},
    deliveredAt:{type:Date},

},{
    timestamps:true
})

module.exports = OrderModel = mongoose.model('order',orderSchema);