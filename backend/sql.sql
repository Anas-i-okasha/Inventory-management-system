-- users table

CREATE TABLE users (
id int  AUTO_INCREMENT NOT NULL,
first_name varchar(255),
last_name varchar(255),
email varchar(255) unique,
password text NOT NULL,
phone_number varchar (255),
create_date DATETIME DEFAULT now(),
is_deleted boolean DEFAULT false,
PRIMARY KEY (id)
)

