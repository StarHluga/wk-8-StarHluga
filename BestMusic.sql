-- Create Database 
CREATE DATABASE Musicdb;

-- create tables
USE Musicdb;
-- Table: Genres 
CREATE TABLE Genres (
genre_id INT PRIMARY KEY AUTO_INCREMENT,
genre_name VARCHAR(50) NOT NULL
);

-- Table: Artists
CREATE TABLE Artists (
artist_id INT PRIMARY KEY AUTO_INCREMENT,
artist_name VARCHAR(100) NOT NULL,
country VARCHAR(50)
);

-- Table: Albums
CREATE TABLE Albums (
album_id INT PRIMARY KEY AUTO_INCREMENT,
album_name VARCHAR(100) NOT NULL,
artist_id INT,
release_year INT,
FOREIGN KEY (artist_id) REFERENCES Artists(artist_id)
);

-- Table: Songs
CREATE TABLE Songs (
song_id INT PRIMARY KEY AUTO_INCREMENT,
song_name VARCHAR(100) NOT NULL,
album_id INT,
genre_id INT,
duration TIME,
FOREIGN KEY (album_id) REFERENCES Albums(album_id),
FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

-- Insert into musicdb tables
-- Insert Genres
INSERT INTO Genres (genre_name)
VALUES('Hip Hop'), ('Pop'), ('Reggae'), ('Classical'), ('Deep House');

-- Insert Artists
INSERT INTO Artists (artist_name, country)
VALUES('Kendrick Lamar', 'USA'),('Lorine Chia', 'USA'),('Culture','Canadian'),('Tchaikovsky','Russia'),('Buddynice','RSA');

-- Insert Albums
INSERT INTO Albums (album_name,artist_id, release_year)
VALUES('Mr Morale. & The Big Steppers',1,2022),('Onomatopoeic',2,2015),('Lion Rock',3,1982),('Piano Concerto',4,1875),('I Fell In Love',5,2025);

-- Insert Songs
INSERT INTO Songs(song_name, album_id, genre_id, duration)
VALUES('Count Me Out',1,1,'00:04:44'),
	('Burn One',2,2,'00:04:19'),
	('Forward To Africa',3,3,'00:06:31'),
	('Piano Concerto: No 1. op 23',4,4,'00:39:28'),
    ('Ngiyajola(Remedial Mix)',5,5,'00:08:21');