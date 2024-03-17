/* jshint node:true */
"use strict";
const joi = require("joi");
const validateSchema = require("./base").validateSchema;



function __validateGetIotSensor(req, property) {
    return new Promise(function (fulfill, reject) {
        try {
            let schema = joi.object().options({ abortEarly: false }).keys({
                towerId: joi.string().required()
            });
            validateSchema(req[property], schema)
                .then(function (validationResult) {
                    fulfill(validationResult);
                })
                .catch(function (ex) {
                    reject(ex);
                    return;
                });

        } catch (ex) {
            reject(ex);
            return;
        }
    });
}

module.exports = {
    __validateGetIotSensor 
}