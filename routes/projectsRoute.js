const router = require('express').Router();

const db = require('../api/data/projects-model');

router.get('/', (req, res)=>{
    db.getAllProjects()
    .then(responseData=>{
        res.status(200).json(responseData)
    })
    .catch(err=>{
        console.log('there was an error',err)
        res.status(500).json({message: 'there was an error'})
    })
})


router.post('/', (req, res)=>{
    db.addProject(req.body)
    .then(data =>{
        res.status(201).json(data)
    })
    .catch(err=>{
        console.log('there was an error', err)
        res.status(500).json({message: 'there was an error'})
    })
})

router.put('/:projectId', (req, res)=>{
    const {projectId} = req.params
    db.updateProject(projectId, req.body)
    .then(data=>res.status(201).json(data))
    .catch(err=>{
        console.log('there was an error', err)
        res.status(500).json({message: 'there was an error'})
    })
})

module.exports = router