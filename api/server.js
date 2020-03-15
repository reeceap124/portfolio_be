const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const emailRouter = require('../routes/emailRoute')


const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json())
server.use('/api/email', emailRouter)


server.get('/', (req,res)=>{
    res.send('Server is Live')
})

module.exports = server