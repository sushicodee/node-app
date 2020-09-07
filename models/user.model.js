const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        sparse:true,
    },
    phone:Number,
    address:{
        temp_address:[String],
        permanent_address:String,
    },
    dob:Date || null,
    image:String,
    gender:{
        type:String,
        enum:['male','female','others']
    },
    role:{
        //1 admin 2 end-user 3 visitor
        type:Number,
        default:2
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active',
    },
    description:String,
    updatedBy:String,
},{timestamps:true})

module.exports = UserModel = mongoose.model('user',userSchema)