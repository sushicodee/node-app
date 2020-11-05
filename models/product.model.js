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

const love = new Schema({
        type:Schema.Types.ObjectId,
        ref:'user'
},{timestamps:true})



const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    sku:String,
    description:String,
    price:{
        type:Number,
        required:true
    },
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
    subCategory:{
        type:String,
        required:true,
    },
    manuDate:Date | null,
    expiryDate:Date | null,
    quantity:Number,
    size:{
        unitOfMeasurement:String,
        sizeValue:String
    },
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
        offerDiscountType:{
            type:String,
            enum:['value','percentage','quantity','none'],
            default:'none',
        },
        discount:Number,
        offerDiscount:Number,
    },
    image:String,
    images:[String],
    love:[love],
    vendor:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    views:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    },{
        timestamps:true
    }]

    
},{timestamps:true})

module.exports  = ProductModel = mongoose.model('product',productSchema)