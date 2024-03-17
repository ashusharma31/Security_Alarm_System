"use strict";
/* jshint node:true */
const Express = require("express");
const Router = Express.Router();
const ConnectionManagement = require('../connection-management');
const validation = require("../validations");
/**
 * @api {get} /api/iot-sensor
 *
 * @apiParam  params
 * 
 * @apiSuccess {Object} data Response Data.
 * @apiSuccess {Boolean} isActionSuccess Successful Response.
 * 
 * @apiError {Object} data Response Data.
 * @apiError {Object} validationErrors Validation Errors.
 */
Router.get("/:towerId", async function (req, res) {
    try {
        await validation.iotSensor.__validateGetIotSensor(req, "params");
        let returnObject = await getLatestFiveRecords(req.params.towerId);
        res.status(201).json({
            data: returnObject.data,
            isActionSuccess: true
        });
    }
    catch (err) {
        res.status(400).json({
            isActionSuccess: false,
            message: err
        });
    }
})


async function getLatestFiveRecords(towerId) {
    try {
        let connectionManager = new ConnectionManagement();
        let __databaseConnection = await connectionManager.connection();
        let records = await __databaseConnection.collection("iotSensor_v1").find({
            towerId: towerId,
            isAnomalies: true
        }, 'fuelStatus temperature')
            .sort('-createdDateTimeUtc')
            .limit(5)
            ;

        records = await records.toArray();
        return { data: records };
    } catch (error) {
        console.error('Error fetching latest five records:', error);
        throw error; // Rethrow or handle as needed
    }
}

module.exports = Router;