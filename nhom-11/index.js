var express = require('express');
var mysql = require('mysql');
var app = express();
var http =require('http').Server(app);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const trangChu = require('./routes/trang_chu')
const giaiDau = require('./routes/giai_dau');
const {ManCity} = require('./routes/clb_anh');

var urlencodedParser =  bodyParser.urlencoded({extended :false})
app.set('view engine','ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(trangChu);
app.use(giaiDau);



http.listen(process.env.PORT || 8888, function(){
  console.log('listening on *:8888');
});
