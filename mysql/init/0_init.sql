CREATE DATABASE
IF NOT EXISTS hash;

CREATE TABLE
IF NOT EXISTS hash.users
(
  id int PRIMARY KEY AUTO_INCREMENT,
  user_name varchar(64) NOT NULL,
  display_name varchar(64) NOT NULL,
  email varchar(64) NOT NULL,
  password varchar(255) NOT NULL,
  is_active tinyint(1) DEFAULT 1,
  is_staff tinyint(1) DEFAULT 0,
  created_at datetime  DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hash.user_tags
(
  tag_master_id int NOT NULL,
  tag_sub_id int NOT NULL,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hash.tags_master
(
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hash.tags_sub
(
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hash.tags_master_tags_sub
(
  tag_master_id int NOT NULL,
  tag_sub_id int NOT NULL,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hash.search_value
(
  id int PRIMARY KEY AUTO_INCREMENT,
  value varchar(255) NOT NULL,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hachet.stocks
(
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  content varchar(2550) NOT NULL,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hash.note_tags_master
(
  id int PRIMARY KEY AUTO_INCREMENT,
  note_id int,
  tags_id int,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE
IF NOT EXISTS hash.note_groups
(
  id int PRIMARY KEY AUTO_INCREMENT,
  note_id int,
  group_name varchar(255) NOT NULL,
  created_at datetime  default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

