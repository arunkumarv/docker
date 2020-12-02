const express = require('express')
const Sequelize = require('sequelize')
var bodyParser = require('body-parser')
 
var app = express() 
 
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
const port = 3000

const conn = new Sequelize('test', 'root', 'tab#8Bc:', {
    // host: '172.21.0.2',
    host: 'localhost',
    dialect: 'mysql',
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    logging: false
}); 

const Student = conn.define ( 'student', { name: Sequelize.STRING }); 

const myForm = '<form method="post"><input name="name" autofocus><input type="submit">';

app.get ( '/', (req, res) => res.send ( myForm ) ) 

app.post ( '/', (req, res) => Student.create( req.body )
    .then ( () => res.send ( myForm ) )
    .catch ( () => res.send(myForm))) 

conn.sync({ force: true }).then().catch( (e) => console.log (e));

app.listen(port, () => console.log ( `Running at port ${port}` ))