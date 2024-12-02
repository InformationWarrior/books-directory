const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Book = require('../model/book.model');
const filePath = path.join(__dirname, 'book.data.json');
const log = console.log;

log("File Path >>>>> " +filePath);

const seedBooks = async () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const books = JSON.parse(fileData);
        await Book.insertMany(books);
        log("Books successfully added to database. ");
    }
    catch (error) {
        log("Error seeding books > ", error);
    }
    finally{
        await mongoose.disconnect();
        log("Database disconnected");
    }
};

module.exports = seedBooks;