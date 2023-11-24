 CREATE TABLE suggestions (
     id SERIAL, 
     text LONGTEXT CHARACTER SET utf8mb4,
     destination VARCHAR(20), 
     timestamp VARCHAR(100)
 );
