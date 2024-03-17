"use strict";
const mongoose = require("mongoose");
const iotSensor = new mongoose.Schema({
    towerId: {
        type: String,
        required: true,
    },
    location: {
        lat: Number,
        long: Number
    },
    temperature: {
        type: Number,
        required: true,
    },
    powerSource: {
        type: String,
        required: true,
    },
    fuelStatus:{
       type:Number,
       required: true,
    },
    createdDateTimeUtc: {
        type: Date,
        required: true,
    },
    lastUpdatedDateTimeUtc: {
        type: Date,
        required: true,
    },
    deletedDateTimeUtc: {
        type: Date,
        default: null,
    }
});
 

const iotSensorModel = mongoose.model("iotSensor_v1", iotSensor);
module.exports = iotSensorModel;