drop table if exists users;
drop table if exists posts;

create table users (
id serial primary key,
username varchar(20),
password varchar(100),
profile_pic text
);

create table posts (
id serial primary key,
title varchar(45),
img text,
content text,
author_id integer references users(id)
);
