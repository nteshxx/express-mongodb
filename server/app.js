const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')
//fastwrld


require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))
//connection to database
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb")
})
mongoose.connection.on('error',(err)=>{
    console.log("error in connecting to mongodb",err)
})



app.listen(PORT, ()=> {
    console.log("server is running on ", PORT)
})