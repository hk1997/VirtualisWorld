var mongoose=require('mongoose');
var Schema=mongoose.Schema;

sensor_userSchema=new Schema(
{
	sensor_id:{type:String},
	type:{type:String},
	admin:{type:String,default:null}
});


module.exports=mongoose.model('sensor_user',sensor_userSchema);