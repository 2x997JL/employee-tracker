drop database if exists `employee_db`;
create database `employee_db`;
use `employee_db`;

create table department(
    id int primary key auto_increment,
    name varchar(50) not null
);

create table role(
    id int primary key auto_increment,
    title varchar(50) not null,
    salary decimal(10,2) not null,
    department_id int not null,
    foreign key (department_id) references department(id)
);

create table employee(
    id int primary key auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    role_id int not null,
    foreign key (role_id) references role(id)
);

insert into department (name) values ('Sales');
insert into department (name) values ('Engineering');
insert into department (name) values ('Finance');
insert into department (name) values ('Legal');
insert into role (title, salary, department_id) values ('Sales Lead', 100000, 1);
insert into role (title, salary, department_id) values ('Salesperson', 80000, 1);
insert into role (title, salary, department_id) values ('Lead Engineer', 150000, 2);
insert into role (title, salary, department_id) values ('Software Engineer', 120000, 2);
insert into role (title, salary, department_id) values ('Accountant', 125000, 3);
insert into role (title, salary, department_id) values ('Legal Team Lead', 130000, 4);
insert into role (title, salary, department_id) values ('Lawyer', 110000, 4);
insert into employee (first_name, last_name, role_id) values ('John', 'Doe', 1);
insert into employee (first_name, last_name, role_id) values ('Jane', 'Doe', 2);
insert into employee (first_name, last_name, role_id) values ('John', 'Smith', 3);
insert into employee (first_name, last_name, role_id) values ('Jane', 'Smith', 4);
insert into employee (first_name, last_name, role_id) values ('John', 'Doe', 5);
insert into employee (first_name, last_name, role_id) values ('Jane', 'Doe', 6);
insert into employee (first_name, last_name, role_id) values ('John', 'Smith', 7);