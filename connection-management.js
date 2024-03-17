
"use strict";
/* jshint node:true */
const mongoose = require('mongoose');

const ConnectionManagement = /* @class */ function connectionManager(connectionOptions) {
    var DB = 'mongodb+srv://ashu_sharma_31:7UFBeV1N7GrHn7X2@cluster0.qzam5xx.mongodb.net/mongoatlas?retryWrites=true&w=majority';
    var __mongoDatabaseConnection = async () => {
        return new Promise(function (fulfill, reject) {
            try {
                // mongoose.set("strictQuery", false);
                mongoose.connect(DB, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                fulfill(mongoose.connection);
                return;
            }
            catch (ex) {
                reject(`Error in making connection ${ex}`);
                return;
            }
        });
    };

    this.connection = async function () {
        try {
            let connection = await __mongoDatabaseConnection();
            const mongoModel = require("./model-collection");
            console.log("connection", connection);


            return connection;
        } catch (ex) {
            throw ex;
        }
    };
}


module.exports = ConnectionManagement;