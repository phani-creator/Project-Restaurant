const express=require('express');
const mongoose =require('mongoose');
const app=express();
app.set('view engine','ejs');
const dbUrl="mongodb+srv://phani:phani1234@registration.z9fmm9v.mongodb.net/ResRegister?retryWrites=true&w=majority";
mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true,useFindAndModify:false})

    .then((result)=>app.listen(3000))
    .catch((err)=>{console.log(err)});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const { registerModel, DataRegisters } = require('./Models/model');

  
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/register',(req,res)=>{
    res.render('register');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post('/register',async (req,res)=>{
    const password=req.body.Password;
    const cpassword=req.body.ConfirmPassword;
    if(password === cpassword){
        const registerEmployee = new registerModel(req.body);
        registerEmployee.save()
        .then((result)=>{
            res.render('login');
            
        })
        .catch((err)=>{
            res.status(404).render("error");
        });
    }
    else{
        res.status(404).render("Passwords are not matching");
    }
    
});
app.post('/login',async (req,res) =>{
    try{
        const email=req.body.Email;
        const password=req.body.Password;
        const user = await  registerModel.findOne({Email:email});
        if(user.Password === password)
        {
            res.render('Main');
        }else{
            res.send("Email and Password are not matching Go back and enter login details again");
        }

    }catch(error){
        res.send("Invalid Email");
    }
    
    
});
app.post('/Main', async (req,res)=>{
    //let recipies=req.body.Recipies
    //DataRegister.findOne({Recipies:recipies}, function(data){
      //  if(DataRegister.Recipies===recipies)
        //res.render('News',{
          //  foodlist:data
        //})

    //})
    
        const recipie=req.body.Recipie;
        console.log(recipie[0]);
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb+srv://phani:phani1234@registration.z9fmm9v.mongodb.net/ResRegister?retryWrites=true&w=majority";
        MongoClient.connect(url, function(err, db) {
            //if (err) throw err;
            var dbo = db.db("ResRegister");
            var query = { Recipies: recipie[0]};
            dbo.collection("DataRegisters").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.render('News',{result});
            });
        });
       
        
        
        //Course.find({ category: "Database" })
        //.then(data => {
        //console.log("Database Courses:")
        //console.log(data);
  
        // Putting all course id's in dbcourse array
        //data.map((d, k) => {
          //  dbcourse.push(d._id);
        //})
       

  
        //dbUrl.collection("DataRegister").find({Recipies:recipies}).toArray(function(err, result) {
          //  if (err) throw err;
            //console.log(result);
        //});


    //const recipies=req.body.Recipies;
    //const User = await DataRegister.findOne({Recipies:recipies});
    
    //if(User.Recipies===recipies)
    //{
      //  res.render('News',{User});
    //}
    //else
    //{
      //  res.send('Not Available');
    //}
    
});
app.use((req,res)=>{
    res.status(404).render('404');
});

