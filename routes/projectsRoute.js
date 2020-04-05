const router = require('express').Router();

const db = require('../api/data/projects-model');

router.get('/', (req, res)=>{
    db.getAllProjects()
    .then(responseData=>{
        const data = responseData
        console.log('router res', data);
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log('there was an error',err)
        res.status(500).json({message: 'there was an error'})
    })
})


router.post('/', (req, res)=>{
    console.log('req body', req.body)
    db.addProject(req.body)
    .then(data =>{
        console.log('added the thing', data)
        res.status(201).json(data)
    })
    .catch(err=>{
        console.log('there was an error', err)
        res.status(500).json({message: 'there was an error'})
    })
})

module.exports = router