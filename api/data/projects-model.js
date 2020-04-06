const db = require('./db')

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    // updateProject,
    // deleteProject,
}

function getAllProjects(){
   return db.query('SELECT * FROM projects')
   .then(projects => projects.rows)
   .catch(e=>console.log('error', e.stack))
}

function getProjectById(id){
    return db.query(`SELECT * FROM projects WHERE pid = ${id}`)
    .then(res => res.rows[0])
}

function addProject(project){
    const {name, description, technologies, deployLink, githubLink, imgRef} = project
    const values = [name, description, technologies, deployLink, githubLink, imgRef]
    const query = 'INSERT INTO projects (name, description, technologies, deployLink, githubLink, imgRef) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pid'
    return db.query(query, values)
    .then(added => getProjectById(added.rows[0].pid))
    .then(res=> res)
    .catch(err=>{
        console.log('there was an error', err)
    })
}