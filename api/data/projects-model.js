const db = require('./db-config')

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
}

function getAllProjects(){
   return db('projects')
}

function getProjectById(id){
    return db('projects').where({id})
}

function addProject(project){
    return db('projects').insert(project, 'id')
    .then(([id])=>{
        return this.getProjectById(id)
    })
}

function updateProject(id, updates){
    return db('projects').where({id}).update(updates, '*')
}

function deleteProject(id) {
    return db('projects').where({id}).del()
}