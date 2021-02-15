const request=require('request')


const forCast=(lat,long,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=0090fb8dacafa31c28626cde3c486694&query='+ lat+','+long+'&units=m'
   // request({url:url,json:true},(error,response)=>{
    request({url:url,json:true},(error,{ body })=>{
        if(error){

            callback("Unable to conneted the Weather APi",undefined)
        }else if(body.error){
     
            callback(undefined,"Unable to find the Location")

        }else{

             callback(undefined,

                'current temperature'+ ' ' + body.current.temperature+"Feels like "+ ' '+ body.current.feelslike +' Weather Description'+''+ body.current.weather_descriptions[0]
             );

        }
 
    })
}

module.exports=forCast