
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('users', (tbl)=> {
            tbl.increments();
            tbl.string('name', 255)
            tbl.string('oktaId',255)
        })
        .createTable('projects', (tbl)=>{
            tbl.increments();
            tbl.string('name',255).notNullable();
            tbl.string('description').notNullable();
            tbl.string('technologies', 255).notNullable();
            tbl.string('deployLink',255);
            tbl.string('githubLink');
            tbl.binary('imgRef')
        })
  )
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('users')
};
