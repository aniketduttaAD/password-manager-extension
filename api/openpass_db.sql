drop database openpassworddb;
drop user openpassword;

create user openpassword with password 'password';
create database openpassworddb with template = template0 owner = openpassword;
\connect openpassworddb;
alter default privileges grant all on tables to openpassword;
alter default privileges grant all on sequences to openpassword;

create table op_users(
user_id varchar(20) not null,
first_name varchar(20) not null,
last_name varchar(20) not null,
email varchar(30) not null,
password text not null
);
