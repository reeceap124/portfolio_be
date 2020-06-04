
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('projects', (tbl)=>{
            tbl.increments();
            tbl.string('name',255).notNullable();
            tbl.string('description', 1000).notNullable();
            tbl.string('technologies', 255).notNullable();
            tbl.string('deployLink',255);
            tbl.string('githubLink',255);
            tbl.string('imgRef', 500000);
        })
  )
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
};
