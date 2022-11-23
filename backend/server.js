import Express from 'express';
import 'dotenv/config'
import fetch from 'node-fetch';


const server = Express()
server.use(Express.json())

const PORT = process.env.PORT

server.get('/weather/:city',(req,res) =>{
  const city = req.params.city
console.log('called')
fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY_WEATHER}`
    ) .then(res=>res.json())
    .then(data=> res.json(data))

    
  
   
} )

server.get('/findcity/:city',(req,res) =>{
  const city = req.params.city
console.log('called2')
fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${city}&lang=en&limit=1&type=city&apiKey=${process.env.API_KEY_CITY}`
    ) .then(res=>res.json())
    .then(data=> {
      
      res.json(data)
    console.log(data.features[0].properties.name)
    })

    
  
   
} )




server.listen(PORT, () => console.log(`Listening on port ${PORT} `))