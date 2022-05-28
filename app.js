const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));//help to have local files

app.use(bodyParser.urlencoded({extended :true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };


app.post("/failure",function(req,res){
  res.redirect("/");
})
  const jsonData = JSON.stringify(data);//changes javascript to JSON format

  const URL = "https://us14.api.mailchimp.com/3.0/lists/8cf25c04b2"

  const options = {
    method: "POST",
    auth: "sandip:7f23b1c107d86835da8ade3c6eb9621c-us14"
  }

  const request = https.request(URL, options, function(response){

    if(response.statusCode==200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

  console.log(firstname, lastname, email)
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});


//7f23b1c107d86835da8ade3c6eb9621c-us14   -API Key
//8cf25c04b2    -Audiance List I'D
//https://usX.api.mailchimp.com/3.0/lists
