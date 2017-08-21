# VirtualisWorld
//For register

url: /api/register

 (send this data in body)

name:ShubhamShuklas
city:lucknow
address:lucknow
phone_num:8989529628
email:unishubha1@live.com
latitude:252.23
longitude:2.0
password:45

(data recieved)

{"message":"The email id or phone number already registered already registered"}
(show the error on screen that these credentials have already been taken)

{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ODdkZjk5ZjVjMTRjYjBhODQyNGMzMzEiLCJlbWFpbCI6InVuaXNodWJoYTFAbGl2ZS5jb20iLCJuYW1lIjoiU2h1YmhhbVNodWtsYXMiLCJleHAiOjE0OTI0MjY5MTEsImlhdCI6MTQ4NDY1MDkxMX0.T0uazVJneeysNIBNSaON0ITN_1b5AWqjUW5MnoYQ9Z0"}

(if this token is recieved, then save the token in phone and mark the user as logged in, please note that all data of user like name, email etc is encrypted in token , and can be decrytped)
------------------------------------------------------------------------------------------------------------------------
url: /api/login/
(send data in body)
email:unishubha1@live.com
password:45

(data recieved)

{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ODdkZjk5ZjVjMTRjYjBhODQyNGMzMzEiLCJlbWFpbCI6InVuaXNodWJoYTFAbGl2ZS5jb20iLCJuYW1lIjoiU2h1YmhhbVNodWtsYXMiLCJleHAiOjE0OTI0MjcwMDYsImlhdCI6MTQ4NDY1MTAwNn0.l_elrdlnnyXVGDV3YLgl73HDJTqZpDG2OzY2GljRYbw"}

(save the token and mark the user as logged in)




//To add a new device

url: /api/addDevice/




(in the header)
Content-Type:application/x-www-form-urlencoded
Authorization:Bearer  “token”


  example:
Content-Type:application/x-www-form-urlencoded
Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ODdjM2I4NjY0MjFiZjExZjhiOGZiNzMiLCJlbWFpbCI6InVuaXF1ZXNodWJoYW0xQGdtYWlsLmNvbSIsIm5hbWUiOiJTaHViaGFtU2h1a2xhcyIsImV4cCI6MTQ5MjMxMjc3MywiaWF0IjoxNDg0NTM2NzczfQ.d100olt-rX-gYNCJwLlVSyqKTp_2mSTRxgTPcGGX3UA

(in the body)

{

device_id:587c3ab26421bf11f8b8fb72
}
(response)

{"message" : "Please enter a valid device id"}

(Show the user that the device_id entered by him/her is invalid)

{"message" : "Please login to add a new device"}

(Tell the user that he must be logged in to add a device)

{"message": "Added Successfully"}

(Device added)



url: /api/showDevice/

(header as above)

(nothing in body)

(response)

"[\"587c3a056421bf11f8b8fb71\",1,\"587c3ab26421bf11f8b8fb72\",0]"

(array of device_id and their current state)

{"message" : "Please login to add a new device"}

(Tell the user that he must be logged in to see devices)





url: /api/write/

(header as above)

(body)

device_id:587c3ab26421bf11f8b8fb72
data:1

(response)

{"message":"Current state 1"}

(show the user that status has been changed)

/------------------------------------------------------------------------------------------------------------------------/

url: /api/addSensor 
(in the header)
Content-Type:application/x-www-form-urlencoded
Authorization:Bearer  “token”

body: {
	
"type"://provide a sensor type,
“sensor_id”: //provide a sensor id
}

Response:
{"__v":0,"admin":"591eb0eeb915b67967d83c92","type":"temperature","_id":"591eb59cefe0010d482a9646"}

url: /api/listSensor (get request)

Headers: Same as above

Response: returns list of all the sensors of the logged in user
[{"_id":"591eb2b88f068435a87e7ab1","admin":"591eb0eeb915b67967d83c92","type":"voltage","__v":0},{"_id":"591eb501efe0010d482a9644","admin":"591eb0eeb915b67967d83c92","type":"pressure","__v":0},{"_id":"591eb50cefe0010d482a9645","admin":"591eb0eeb915b67967d83c92","type":"temperature","__v":0},{"_id":"591eb59cefe0010d482a9646","admin":"591eb0eeb915b67967d83c92","type":"temperature","__v":0}]

//------------------------------------------------------------------------------------------------------------//

url: /api/ addSensorDevice
header: same as above
adds in sensor_device schema
body:
{
	"sensor_id":"591ecad2e3524807103c15d6",
	"device_id":"587c3ab26421bf11f8b8fb72",
	"threshold_start":1.23,
	"threshold_stop":1.74
	
}

Res:
{"__v":0,"threshold_stop":1.74,"threshold_start":1.23,"sensor_id":"591ecad2e3524807103c15d6","device_id":"587c3ab26421bf11f8b8fb72","_id":"591ecb6de3524807103c15d8"}
{message:'please provide a sensor type'}
(if no sensor type is provided)
{message:'invalid sensor type'}
(if it is an invalid sensor type)
//----------------------------------------------request from sensor-------------------------------//
Request form: get
url: /sensorWrite/:sensor_id/:data
returns state of device
{err:"invalid sensor id"}
(if invalid sensor id is provided)
{message:'please provide sensor id/data'}
(“if no data or sensor id is provided”)


//-----------------------------------admin routes-------------------------------------------------------------------//
url: /api/addSensorType
data in boy:
{
	type:”voltage”
}
Response:
{"id":"591e955018a239317cad921f"}

Err: If no data is provided in body : 
response {"message":"please provide a sensor type"}
err: if sensor already exists
response:
{"code":11000,"index":0,"errmsg":"E11000 duplicate key error collection: meanAuth.sensor_types index: type_1 dup key: { : \"voltage\" }","op":{"type":"voltage","_id":"591e960318a239317cad9220","__v":0}}


url: /api/listSensorType (get)
response:
[{"_id":"591e8da2bd07800020004ce1","type":"pressure","__v":0},{"_id":"591e8db7bd07800020004ce3","__v":0},{"_id":"591e952c18a239317cad921c","type":"temperature","__v":0},{"_id":"591e955018a239317cad921f","type":"voltage","__v":0}]



url: /api/addNewSensor  (adds new sensor to database)
body:
{
	type: //type of sensor to be added
}

Response:
{
    "__v": 0,
    "_id": "599654df8bd60e03b4716906",
    "type": "electric",
    "admin": null
}

{‘ please provide a valid sensor type’}
(if no sensor type is provided)

//----------------------------------------------------------------------------------------------------------------------------//
url: /api/ /addNewDevice
    "message": {
        "__v": 0,
        "_id": "599655d38bd60e03b4716907",
        "last_updated_at": null,
        "last_updated_by": null,
        "appliance_id": null,
        "admin": null,
        "state": 0
    }

