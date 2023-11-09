CREATE TABLE "songs" (
	"id" SERIAL PRIMARY KEY,
	"artist" VARCHAR (250) NOT NULL,
	"songName" VARCHAR (1000) NOT NULL,
  	"notes" VARCHAR(9000)
);

CREATE TABLE "foods" (
	"id" SERIAL PRIMARY KEY,
	"food" VARCHAR (250) NOT NULL,
	"mealtime" VARCHAR (1000) NOT NULL
);

INSERT INTO "songs"
 	("artist", "songName", "notes")
VALUES 
('ILLENIUM, Jon Bellion', 'Sometimes Good Things Fall Apart', 'New addition to my favorites!'),
('Wintergatan', 'Sommarfågel', 'A shame they don''t make music as a group anymore.');

INSERT INTO "foods"
	("food", "mealtime")
VALUES
	('Tacos', 'Dinnertime'),
	('Meat Sandwhich', 'Lunchtime');