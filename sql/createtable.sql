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
    isbn varchar(13) NOT NULL,
    book_id varchar(13) NOT NULL,
    title varchar(100) NOT NULL, 
    description varchar(1024),
    img_url varchar(255),
    rental_status varchar(100),
    rental_user varchar(100),
    PRIMARY KEY(isbn,book_id)
)
CHARACTER SET utf8mb4 
COLLATE utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS lending;
CREATE TABLE IF NOT EXISTS lending 
(
    lending_user_id varchar(16) NOT NULL,
    isbn varchar(13) NOT NULL,
    book_id varchar(13) NOT NULL,
    rental_date Date NOT NULL,
    managed_user_id varchar(16) NOT NULL,
    return_plan_date Date NOT NULL,
    PRIMARY KEY(lending_user_id,isbn,rental_date)
)
CHARACTER SET utf8mb4 
COLLATE utf8mb4_0900_ai_ci;