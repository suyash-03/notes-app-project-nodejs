const express = require('express');
const morgan = require('morgan');

//express app
const app = express();


//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

app.use((req,res,next)=>{
    console.log('new request made');
    console.log('host:',req.hostname);
    console.log('path:',req.path);
    console.log('method:',req.method);
    next();
});

//Middleware and static files
app.use(express.static('public'));

app.use(morgan('dev')); //third party middleware

app.get('/', (req,res) => {
    res.statusCode = 200;
    //Send method automatically figures out the content type header
    // res.send('<p>home page</p>') 
    // res.sendFile('./views/index.html', {root: __dirname});

    const blogs = [
        {title: 'Yoshi finds egss', snippet: 'Lorem Ipsum'},
        {title: 'Yoshi finds nothing', snippet: 'Lorem Ipsum'},
        {title: 'Unga Bunga ', snippet: 'Lorem Ipsum'},
    ];
    res.render('index',{title: 'Home',blogs: blogs});
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

