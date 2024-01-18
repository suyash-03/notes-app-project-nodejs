const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const blog = require('./models/blogs');
const { result } = require('lodash');

//express app
const app = express();

//connect to mongodb
const dbUri = "mongodb+srv://suyashsingh9450:Tipsy9450@nodejs.qcaplno.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbUri).then((res)=>{
    console.log("Database Connected");
    app.listen(3000);
}).catch((err)=>console.log(err));

//register view engine
app.set('view engine', 'ejs');


// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host:',req.hostname);
//     console.log('path:',req.path);
//     console.log('method:',req.method);
//     next();
// });

//Middleware and static files
app.use(express.static('public'));

app.use(morgan('dev')); //third party middleware




app.get('/', (req,res) => {
    res.redirect('/blogs');
});

//blog routes
app.get('/blogs',(req,res) => {
    Blog.find().sort({createdAt: -1}).then((result) => {
        res.render('index',{title: 'All Blogs', blogs: result});
    }).catch((err) => {
        console.log(err);
    })
});

app.get('/about', (req,res) => {
    //by default express uses absolute path so we need to give an additional arguemnt to specifiying the root folder for it look relative
    res.render('about',{title: 'About'})
});

app.get('/blogs/create',(req,res) =>{
    res.render('create',{title: 'Create Blog'});
});



//redirects
app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

//404 Page
// If code reaches this point this method will fire thus this method needs to be at the bottom
app.use((req,res)=> {
    res.status(404).render('404',{title: '404'});
});

