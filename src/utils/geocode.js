const request=require('request')

const geoCode=(place,callback)=>{

    const geocodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiZGViYS1zb251MSIsImEiOiJjanl6bndhN3owMXVrM29xZDZwdTBidzR1In0.2RuGugYCne7Ak8jsi4ymPg'  
    
    request({url:geocodeUrl,json:true},(error,{ body })=>{
     
      //request({geocodeUrl,json:true},(error,response)=>{
         if(error){
 
           callback("Unable to Connect GeoLocation",undefined)
         }else if(body.features.length===0){
 
          callback("Unable to Find Location!!! Try another Location",undefined)
         }else{
 
           
 
           callback(undefined,{
 
              longitude:body.features[1].center[0],
              lattitude:body.features[1].center[1],
              location:body.features[1].place_name,
           })
         }
 
    })
 
 }


 module.exports=geoCode
 