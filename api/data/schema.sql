CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255) UNIQUE
)

CREATE TABLE projects(
    pid SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    technologies TEXT,
    deployLink VARCHAR(255),
    githubLink VARCHAR(255),
    imgRef VARCHAR(255)
)