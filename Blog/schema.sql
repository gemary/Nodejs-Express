
CREATE TABLE posts(
    pid SERIAL PRIMARY KEY ,
    title VARCHAR(255),
    decription VARCHAR(255),
    body VARCHAR,
    tag VARCHAR(50),
    author VARCHAR(50),
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    likes INT DEFAULT 0,
    banner VARCHAR
);

CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    u_name VARCHAR(50),
    u_password VARCHAR(255),
    u_token VARCHAR(255),
    u_pemission INT DEFAULT 0
);