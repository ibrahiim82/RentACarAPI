"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "plateNumber": "34ABC123",
    "brand": "Ford",
    "model": "Focus",
    "year": 2020,
    "isAutomatic": true,
    "pricePerDay": 249.99
}
{
    "plateNumber": "34ABC234",
    "brand": "Renault",
    "model": "Megane",
    "year": 2022,
    "isAutomatic": false,
    "pricePerDay": 199.99
}
{
    "plateNumber": "34ABC345",
    "brand": "Opel",
    "model": "Astra",
    "year": 2021,
    "isAutomatic": false,
    "pricePerDay": 189.99,
    "isPublish": false
}
/* ------------------------------------------------------- */
// Car Model:
const CarSchema =  new mongoose.Schema({
    plateNumber:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    brand:{
        type:String,
        trim:true,
        required: true
    },
    model:{
        type:String,
        trim:true,
        required: true
    },
    year:{
        type:Number,
        min: 2000,
        max: new Date().getFullYear(),
        required: true
    },
    isAutomatic:{
        type:Boolean,
        default:false
    },
    pricePerDay:{
        type:Number,
        required:true,
    },
    // images: [],   alttakiyle aynı anlamı taşıyor
    images: {
        type:Array,
        default:[]  //! images required olabilir
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    createdId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required:true
    },
    updatedId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required:true
    }
}, {
    collection:'cars',
    timestamps:true,
})
module.exports = mongoose.model('Car', CarSchema)