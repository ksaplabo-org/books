USE intern;

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user 
(
    user_id char(16) NOT NULL PRIMARY KEY,
    user_name varchar(100) NOT NULL,
    user_password char(16) NOT NULL,
    user_gender char(1) NOT NULL,
    user_auth char(1) NOT NULL
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
    rentalDate Date,
    returnDate Date,
    rentalStatus varchar(100),
    rentalUser varchar(100)
)
CHARACTER SET utf8mb4 
COLLATE utf8mb4_0900_ai_ci;
