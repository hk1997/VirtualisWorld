var mongoose=require('mongoose');
var sensor_type=require('../models/sensor_type');
var sensor=require('../models/sensor_new');
var sensor_device=require('../models/sensor_device');
var device_user = mongoose.model('device_user');
var sensor_user=require('../models/sensor_user');
//-------------------------------------------------------------------------------------------------------//
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

/*----------------function to add sensor type-----------------*/
module.exports.addSensorType=function(req,res)
{
	if(!req.body.type)
	{
		return sendJSONresponse(res,500,{message:'please provide a sensor type'});
	}
	var newSensorType=new sensor_type({type:req.body.type});
	
	newSensorType.save(function(err,ns) 
	{
		if(err)
			return sendJSONresponse(res,500,err);
		
		else		
			return sendJSONresponse(res,200,{id:ns._id});
	})

}


/*----------------function to list all  sensor types-----------------*/
module.exports.listSensorType=function(req,res)
{
	sensor_type.find({},function(err,list)
	{
		if(err)
			return sendJSONresponse(res,500,{message:err});
		
		return sendJSONresponse(res,200,list);
	})
}

/*---------------------function to add new sensor ---------------------------------*/
module.exports.addnewSensor=function(req,res)
{
	sensor_type.findOne({type:req.body.type},function(err,type)
	{
		if(err)
			return sendJSONresponse(res,401,err);
		
		else if(!type)
			return sendJSONresponse(res,404,'please provide a valid sensor type');
		
		else
			var newSensor=new sensor();
		newSensor.type=req.body.type;
		newSensor.save(function(err,done)
		{
			if(err)	
				return sendJSONresponse(res,401,err);
			else
				return sendJSONresponse(res,200,done);
		})
	})
}