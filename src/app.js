const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forCast=require('./utils/forecast') 

const app=express()

// Configuaration setting for Express
const publicpath=path.join(__dirname,"../public")
const viewpath=path.join(__dirname,"../templates/views") // as Express's default views folder has been renamed.
const partialpath=path.join(__dirname,"../templates/partials")

// setup handlebar configuaration and Setting for Express

app.set('view engine','hbs') // handle bar view engine for Templating
app.set('views',viewpath)
hbs.registerPartials(partialpath)

// Static Items Setting for express
app.use(express.static(publicpath))

app.get('',(req,res)=>{

      res.render("index",{

          title:"Weather App",
          createdby:"Debasis Acharya"
      })
})

app.get('/about',(req,res)=>{

       res.render("about",{

            title:'About Me',
            content:"I am a Full stack Developer",
            createdby:"Debasis Acharya"
       })
})

app.get('/help',(req,res)=>{

    res.render('help',{
         title:"Help",
         content:"How can i help you?",
         createdby:"Debasis Acharya"
    })
      
})

app.get('/weather',(req,res)=>{

       if(!req.query.address){

           return res.send({
              errorMessage:"Pls provide the Address"
            })
       }

       geoCode(req.query.address,(error,{lattitude,longitude,location}={})=>{ // {} means empty object parameter
          if(error){
   
            return res.send({error})
          }
   
          forCast(lattitude,longitude,(error,forcastedata)=>{
   
            if(error){
   
               return res.send({error})
            }
            res.send({
               location:location,
               forcastedata: forcastedata
               
          })
         
         })
     
   });






       


     
})
//404 not found page
//* means accept all mentioned routes
app.get("*",(req,res)=>{

     res.render("404",{

        title:"Not Found",
        content:"404 Not Found!!!",
        createdby:"Debasis Acharya"
     })

})

app.listen(3000,()=>{

       console.log("Server Started");
})