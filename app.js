
const express=require('express');
const app=express();
const https=require('https');
const bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/index.html");
    // res.send("Get request is accepted");

})

app.post("/",function(req,res){
    console.log(req.body.cityName) 
    console.log(req.body);
    const cityName=req.body.cityName ;
    const apiKey="b3dc543bf87b4240a4b21b39fe7adab5";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+units+"&APPID="+apiKey;
    https.get(url,function(response){
        
        console.log(response.statusCode) ;      
        response.on('data',function(data){
            const weatherObject=JSON.parse(data);
            const temp=weatherObject.main.temp;
            const description=weatherObject.weather[0].description;
            const icon=weatherObject.weather[0].icon;
            // console.log(description)
            const image="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently "+description+" </p>");
            res.write(`<h1>The temparature of ${cityName} is ${temp} degree celcius</h1>`)
            res.write("<img src="+image+">");
        })
    })
})
    
    


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
