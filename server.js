const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.use(express.static(__dirname +'/public'));
app.use((req,res,next)=>{
    
 var log = `${new Date().toString()} : ${req.method} : ${req.url} ` ;
 fs.appendFile('server.log', log + '\n',(err)=>{
     if(err){
         console.log('unable to append log to the file');
     }
  });
  console.log(log);
  next();
    
});

// app.use((req,res,next)=>{
//     res.render('maintnance.hbs',{
//         text:"Server is under maintance please try after sometime",
//     });
// });



hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('toUpperCase',(text)=>{
  return text.toUpperCase();
});
app.set('view engine','hbs');



 app.get('/',(req,res)=>{ 
    res.render('home.hbs',{
        message :"Wecome user",
        title : "Home Page",
        
    }); 

 })

 app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About Us',
        year: new Date().getFullYear(),
    });
 });

app.listen(8000);