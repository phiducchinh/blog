//npm init
//npm i express
//npm i nodemon --save-dev
//npm i morgan --save-dev gửi trạng thái về 
//npm i express-handlebars
//https://github.com/sondnpt00343/nodejs_blog
//npm i node-sass --save-dev (xem package watch)
//npm install mongoose
//npm i mongoose-slug-generator
//npm i method-override
// npm i mongoose-delete

const express = require('express')
const app = express()
const morgan= require('morgan')
const handlebars = require('express-handlebars')
const path= require('path')
const { extname } = require('path')
const route = require('./routes');
const methodOverride= require('method-override')
const port = 3000
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname,'public')));

//xử lý dữ liệu từ form submit lên
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

app.use(methodOverride('_method'));

app.use(morgan('combined'))

app.engine('hbs', handlebars({
  extname:'.hbs',
  helpers:{
    sum: (a,b)=> a+b,
  }
}))
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'resources','views'))

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})