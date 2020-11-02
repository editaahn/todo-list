USE todo_list;

CREATE TABLE todo_manager (
 manager_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name varchar(40) NOT NULL,
 deleted bool NULL
);

CREATE TABLE todo (
 todo_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 manager_id int(10) NULL,
 content varchar(200) NULL,
 deleted bool NOT NULL
);

CREATE TABLE history (
 history_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 type_id varchar(10) NOT NULL,
 todo_id int(10) NOT NULL,
 date datetime NULL,
 prev_manager_id int(10) NULL,
 manager_id int(10) NULL
);

CREATE TABLE action_type (
  type_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type varchar(10) NOT NULL
);

CREATE TABLE todo_order (
 order_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
 manager_id int NOT NULL,
 order_list varchar(200) NULL
);