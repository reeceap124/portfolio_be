const db = require('./db')

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
}

function getAllProjects(){
   return db.query('SELECT * FROM projects ORDER BY pid ASC')
   .then(projects => projects.rows)
   .catch(e=>console.log('there was an error', e))
}

function getProjectById(id){
    const query = `SELECT * FROM projects WHERE pid = ${id}`
    return db.query(query)
    .then(res => res.rows[0])
    .catch(err=> console.log('there was an error', err))
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

function updateProject(id, updates){
    const updateId = id
    const values = [
        updates.name,
        updates.description,
        updates.technologies,
        updates.deployLink,
        updates.githubLink,
        updates.imgRef
    ]
    const query = `UPDATE projects SET name=$1, description=$2, technologies=$3, deployLink=$4, githubLink=$5, imgRef=$6 WHERE pid = ${updateId} RETURNING pid`
    return db.query(query, values)
    .then(res =>  getProjectById(res.rows[0].pid))
    .catch(err=> console.log('there was an error', err))
}

function deleteProject(id) {
    const deleteId = id
    const query = `DELETE FROM projects WHERE pid = ${deleteId}`
    return db.query(query)
    .then(res=> `Deleted project with id of ${deleteId}`)
    .catch(err=>{
        console.log('there was an error', err)
    })
}