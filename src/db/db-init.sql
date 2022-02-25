
create table items(
id int auto_increment primary key,
name text not null,
price int(16) not null,
createdAt datetime,
updatedAt datetime
);