const db = require('./db')

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
}

function getAllProjects(){
   return db.query('SELECT * FROM projects', (err, res)=>{
       if (err) {
           console.log(err)
       } else {
           console.log('from model', res)
           return res
       }
   })
}

function getProjectById(id){
    return db.query(`SELECT * FROM projects WHERE pid = ${id}`, (err, res)=> {
        if (err) {
            console.log(err)
        } else {
            console.log('by project from model', res)
            return res
        }
    })
}