const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratings = new Schema({
    message:String,
    value:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    sku:String,
    description:String,
    price:Number,
    ratings:[ratings],
    status:{
        type:String,
        enum:['avaliable','out of stock','booked','sold'],
        default:'avaliable',
    },
    brand:String,
    category:{
        type:String,
        required:true,
    },
    manuDate:Date,
    expiryDate:Date,
    quantity:Number,
    size:{
        unitOfMeasurement:String,
        value:String
    },
    image:String,
    weight:Number,
    color:[String],
    discount:{
        discountedItem:{
            type:Boolean,
            default:false,
        },
        discountType:{
            type:String,
            enum:['value','percentage','quantity','none'],
            default:'none',
        },
        offers:{
            type:String,
            enum:['sale','festival','code','none'],
            default:'none'
        },
        discount:Number,
        offerDiscount:Number,
    },

    vendor:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

    
},{timestamps:true})

module.exports  = ProductModel = mongoose.model('product',productSchema)