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
 current_manager_id int(10) NULL
);

CREATE TABLE action_type (
  action_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type varchar(10) NOT NULL,
);