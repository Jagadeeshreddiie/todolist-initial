const express= require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

var data=['Eat food','Buy food','Cook food'];
var workData=[];
var today=new Date();



app.get('/',function(req,res){
    var options={
        weekday:'long',
        day:'numeric',
        month:'long'
    };
    var day=today.toLocaleDateString('en-us',options);

    res.render('list',{listhead:day,listitem:data});
});
app.post('/',function(req,res){
    var item=req.body.item;
    if(req.body.button==='Work List'){
        workData.push(item);
        res.redirect('/work');
    }
    else{
    data.push(item);
    res.redirect('/');
    }
});



app.get('/work',function(req,res){
    res.render('list',{listhead:'Work List',listitem:workData});
});

app.listen(3000,function(){
    console.log('Server started on post 3000..');
});