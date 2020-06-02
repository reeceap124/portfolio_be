const db = require('./db-config')

module.exports = {
    getUserByOktaId,
    addUser
    //additional functions would be overkill given my intentions with this app.
}

function getUserByOktaId(oktaId) {
    return db('users').where({oktaId})
}

function addUser(user) {
    return db('users').insert(user)
}