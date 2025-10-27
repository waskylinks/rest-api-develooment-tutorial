const express = require('express');

const app = express();

//middleware to parse JSON bodies
app.use(express.json());

let books = [
    {id: 1,
    title: 'Book 1'
},
    {id: 2,
    title: 'Book 2'
}];

// intro route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our bookstore API'
    });
});

//get all books
app.get('/get', (req, res) => {
    res.json(books);
});

//get single book
app.get('/get/:id', (req, res) => {
    const book = books.find(item => item.id == req.params.id)
    if(book) {
        res.json(book);
    } else {
        res.status(404).json({
            message: 'Book not found! Please try with a different book Id'
        });
    }
})

// add a new book

app.post('/add', (req, res) => {
    const newBook = {
        id: Math.floor(Math.random() * 10000),
        title: `Book ${Math.floor(Math.random() * 10000)}`,
    };

    books.push(newBook);
    res.status(200).json({
        message: 'New book is added successfully',
        data: newBook
    });
});

//update a book 

app.put('/update/:id', (req, res) => {
    const findCurrentBook = books.find(bookItem => bookItem.id == req.params.id);
    if(findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title;
        res.status(200).json({
            message: `Book with ID ${req.params.id} updated successfully`,
            data: findCurrentBook
        });
    } else {
        res.status(404).json({
            message: 'Book not found! Please try with a different book Id'
        });
    }
});

//delete request
app.delete('/delete/:id', (req, res) => {
    const bookIndex = books.findIndex(bookItem => bookItem.id == req.params.id);
    if(bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.status(200).json({
            message: `Book with ID ${req.params.id} deleted successfully`,
            data: deletedBook
        });
    } else {
        res.status(404).json({
            message: 'Book not found! Please try with a different book Id'
        });
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});