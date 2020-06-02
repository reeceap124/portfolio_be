const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const emailRouter = require('../routes/emailRouter')
const projectRouter = require('../routes/projectsRoute')
const bodyParser = require('body-parser')


const server = express();
server.use(bodyParser.json({limit: '500mb'}))
server.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
nodemonserver.use(helmet());
server.use(cors());
server.use(express.json())
server.use('/api/email', emailRouter)
server.use('/api/projects', projectRouter)


server.get('/', (req,res)=>{
    res.send('Server is Live')
})

module.exports = server