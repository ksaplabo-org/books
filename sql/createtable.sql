USE intern;
--drop table user;
--drop table books;
CREATE TABLE IF NOT EXISTS user 
(
    user_id varchar(100) NOT NULL PRIMARY KEY, 
    user_name varchar(100) NOT NULL ,
    user_password varchar(100),
    comment varchar(200)
)
CHARACTER SET utf8mb4 
COLLATE utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS book;
CREATE TABLE IF NOT EXISTS book 
(
    title varchar(100) NOT NULL PRIMARY KEY, 
    description varchar(1024),
    imgUrl varchar(255),
    isbn varchar(100),
    rentalDate varchar(100),
    returnDate varchar(100),
    rentalStatus varchar(100),
    rentalUser varchar(100)
)
CHARACTER SET utf8mb4 
COLLATE utf8mb4_0900_ai_ci;
