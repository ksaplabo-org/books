use intern;
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