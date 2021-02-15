
const weatherform=document.querySelector("form")
const search=document.getElementById('location')

const firstMessage=document.querySelector("#first-message")
const secondMessage=document.querySelector("#second-message")

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    firstMessage.textContent="Loading....."
    secondMessage.textContent=""
    const location=search.value
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{

     response.json().then((data)=>{
        
        if(data.errorMessage){
            
            firstMessage.textContent=data.errorMessage
        } else if(data.error){
            firstMessage.textContent=data.error
        }else{
        
        firstMessage.textContent=data.location
        secondMessage.textContent=data.forcastedata

        }
     })
})
})