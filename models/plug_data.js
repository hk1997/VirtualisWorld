var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//Schema to store the data as recieved by the sensor //

var dataSchemaDemo = new mongoose.Schema({

    device_id : String,
    updated_by: String,
    value: Number,
    updated_at:Date
});

mongoose.model('dataSchemaDemo',dataSchemaDemo);
