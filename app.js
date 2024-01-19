const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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
app.use(express.urlencoded({extended: true})); // for accepting form data
app.use(morgan('dev')); //third party middleware


app.use('/blogs',blogRoutes);

app.get('/', (req,res) => {
    res.redirect('/blogs');
});



app.get('/about', (req,res) => {
    res.render('about',{title: 'About'})
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

