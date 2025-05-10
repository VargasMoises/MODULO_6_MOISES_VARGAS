-- Crear tabla Author
CREATE TABLE Author (
    Author_ID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Nationality VARCHAR(50)
);

-- Insertar datos en Author
INSERT INTO Author (Author_ID, Name, Nationality) VALUES
(1, 'George Orwell', 'British'),
(2, 'Jane Austen', 'British'),
(3, 'Mark Twain', 'American'),
(4, 'J.K. Rowling', 'British'),
(5, 'J.R.R. Tolkien', 'British');

-- Crear tabla Publisher
CREATE TABLE Publisher (
    Publisher_ID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Country VARCHAR(50)
);

-- Insertar datos en Publisher
INSERT INTO Publisher (Publisher_ID, Name, Country) VALUES
(1, 'Penguin Books', 'United Kingdom'),
(2, 'Oxford University Press', 'United Kingdom'),
(3, 'HarperCollins', 'United States');

-- Crear tabla Book
CREATE TABLE Book (
    Book_ID INTEGER PRIMARY KEY,
    Title VARCHAR(100),
    Genre VARCHAR(50),
    Publication_Year INTEGER,
    Publisher_ID INTEGER,
    FOREIGN KEY (Publisher_ID) REFERENCES Publisher(Publisher_ID)
);

-- Insertar datos en Book
INSERT INTO Book (Book_ID, Title, Genre, Publication_Year, Publisher_ID) VALUES
(1, '1984', 'Dystopian', 1949, 1),
(2, 'Pride and Prejudice', 'Romance', 1813, 2),
(3, 'Adventures of Huckleberry Finn', 'Adventure', 1884, 3),
(4, 'Harry Potter and the Philosopher\Stone', 'Fantasy', 1997, 1),
(5, 'The Hobbit', 'Fantasy', 1937, 1);

-- Crear tabla Book_Author (relación muchos a muchos entre Book y Author)
CREATE TABLE Book_Author (
    Book_ID INTEGER,
    Author_ID INTEGER,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID),
    FOREIGN KEY (Author_ID) REFERENCES Author(Author_ID),
    PRIMARY KEY (Book_ID, Author_ID)
);

-- Insertar datos en Book_Author
INSERT INTO Book_Author (Book_ID, Author_ID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(4, 1), -- George Orwell también es coautor de "Harry Potter and the Philosopher's Stone"
(5, 2); -- Jane Austen también es coautora de "The Hobbit"


-- SOLUTION TO TASK 5
-- 1.1

SELECT Book.Title,Publisher.Name AS Publisher_Name
FROM Book
INNER JOIN Publisher ON Book.Publisher_ID = Publisher.Publisher_ID;

-- 1.2

SELECT Author.Name AS Author_Name, Book.Title AS Book_Title
FROM Author
LEFT JOIN Book_Author ON Author.Author_ID = Book_Author.Author_ID
LEFT JOIN Book ON Book.Book_ID = Book_Author.Book_ID;

-- 1.3

SELECT Book.Title AS Book_Title,Author.Name AS Author_Name
FROM Book
RIGHT JOIN Book_Author ON Book.Book_ID = Book_Author.Book_ID
RIGHT JOIN Author ON Author.Author_ID = Book_Author.Author_ID;

-- 1.4

SELECT 
    Book.Title AS Book_Title,
    Author.Name AS Author_Name,
    Publisher.Name AS Publisher_Name
FROM 
    Book
INNER JOIN Book_Author ON Book.Book_ID = Book_Author.Book_ID
INNER JOIN Author ON Book_Author.Author_ID = Author.Author_ID
LEFT JOIN Publisher ON Book.Publisher_ID = Publisher.Publisher_ID;

-- 1.5

SELECT Book.Title AS Book_Title, Author.Name AS Author_Name
FROM Book
INNER JOIN Book_Author ON Book.Book_ID = Book_Author.Book_ID
INNER JOIN Author ON Book_Author.Author_ID = Author.Author_ID
GROUP BY Book.Book_ID, Book.Title, Author.Name
HAVING 
    COUNT(Author.Author_ID) > 1
ORDER BY Book.Title;

