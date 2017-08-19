//utility function to complete sensor write operation
var mongoose = require('mongoose');
var sensor_type=require('../models/sensor_type');
var sensor=require('../models/sensor_new');
var sensor_device=require('../models/sensor_device');
var device_user = require('../models/device_user');
var device = mongoose.model('device');
var dataStore = mongoose.model('dataSchemaDemo');
var write=require('./device').write; //write apiin device.js

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}


/* ---------------------------function for sensor write----------------------*/


//this function serves the get request from our sensors
module.exports.sensorWrite=function(req,res)
{
    res.header("Access-Control-Allow-Origin", "*");
	if(!req.params.sensor_id || !req.params.data)
		return sendJSONresponse(res,400,{message:'please provide sensor id/data'});
	
	sensor_device.findOne({sensor_id:req.params.sensor_id},function(err,sen)
	{
		if(err)
		return sendJSONresponse(res,500,err);
		
        else if(sen==null)
			return sendJSONresponse(res,404,{err:"invalid sensor id"});

		
		//variable to define the state of device as per data sent by sensor
		var state1=0; 
        var data=req.params.data;
	    if(data>sen.threshold_stop) //state=0
		{    		
			state1=0;
		    console.log('data greater than threshold_stop, hence state= '+state1);
        }
		else if(data<sen.threshold_start) //state=1
		{
			state1=1;
            console.log('data less than threshold_start, hence state= '+state1);
            
 		}
        
        //updating the state of device as per sensor's data
 		device.update({_id : sen.device_id}, {$set: {state: state1}}, function(err, done){
                if(err)
                {
                    res.status(401).json({"message":err});
                }
                console.log(done);
                newData = new dataStore();
                newData.state = state1;
                newData.device_id=sen.device_id;
                newData.updated_by = sen.sensor_id; //device state updated by sensor
                newData.updated_at=Date.now();
                newData.save(function(err,saved){
                    if(err)
                    {
                        res.status(401).json({"message":err+" Data Storage "});
                    }
                    else
                    {
                        res.status(200).json(saved);
                    }
                });
                    });
	})
}

