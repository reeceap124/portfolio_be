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
    return db.query(`SELECT * FROM projects WHERE pid = ${id}`, (err, res)=> {
        if (err) {
            console.log(err)
        } else {
            console.log('by project from model', res)
            return res
        }
    })
}

function addProject(project){
    console.log('project', project)
    const {name, description, technologies, deployLink, githubLink, imgRef} = project
    const values = [name, description, technologies, deployLink, githubLink, imgRef]
    return db.query(`INSERT INTO projects (name description, technologies, deployLink, githubLink, imgRef) VALUES ($1, $2, $3, $4, $5, $6)`, values, (err, res)=> {
        if (err) {
            console.log('error in addProject', err)
        } else {
            console.log('make addProject res')
            return res;
        }
    })
}