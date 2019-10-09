
#DROP DATABASE IF EXISTS alsace;
CREATE DATABASE IF NOT EXISTS alsace;
USE alsace;

CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'rowenta';
GRANT ALL PRIVILEGES ON alsace . * TO 'admin'@'%';

-- -----------------------------------------------------
-- Table houses
-- -----------------------------------------------------
CREATE TABLE houses (
	id_house INT NOT NULL AUTO_INCREMENT,
	ref VARCHAR(40) UNIQUE NOT NULL,
	lat DOUBLE,
	lng DOUBLE,
	city VARCHAR(80) NOT NULL,
	street VARCHAR(255),
	codePostal INT(5),
	type VARCHAR(80),
	description TEXT,
	constructionDate VARCHAR(80),
	projectManager VARCHAR(80),
	owner VARCHAR(80),
	materials VARCHAR(80),
	other TEXT,
	PRIMARY KEY (id_house)
)
Engine = InnoDB;

-- -----------------------------------------------------
-- Table medias
-- -----------------------------------------------------
CREATE TABLE medias (
	id_media INT NOT NULL AUTO_INCREMENT,
	fileName VARCHAR(80) UNIQUE NOT NULL,
	category VARCHAR(80) NOT NULL,
	mediaDate VARCHAR(80) NOT NULL,
	houseId INT NOT NULL,
	PRIMARY KEY (id_media),
	CONSTRAINT fk_medias_id_house
	    FOREIGN KEY (houseId)
	    REFERENCES houses(id_house)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE TABLE users (
	id_user INT NOT NULL AUTO_INCREMENT,
	mail VARCHAR(80) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	tempKey VARCHAR(255) UNIQUE,
	name VARCHAR(80),
	firstName VARCHAR(80),
	PRIMARY KEY (id_user)
)
ENGINE = InnoDB;
