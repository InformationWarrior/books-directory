const Book = require('../model/book.model');
const log = console.log;

const createBook = async (req, res) => {
    if (!req.body.title || !req.body.isbn) {
        res.status(500).json({
            message: 'Title or ISBN cannot be empty.'
        });
        return;
    }

    const book = new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        publishedDate: req.body.publishedDate,
        thumbnailUrl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        status: req.body.status,
        authors: req.body.authors,
        categories: req.body.categories
    });

    try {
        const data = await book.save();
        if (!data) {
            res.status(500).json({
                message: `Error occurred while saving book with title ${title}`
            });
        }
        else {
            res.status(200).json({
                message: "Book saved successfully",
                book: data
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error occurred while saving book with title ${title}`
        });
    }
};

const findAllBooks = async (req, res) => {
    const id = req.query.isbn;
    var condition = id ? { isbn: { $regex: new RegExp(id), $options: 'i' } } : {};

    try {
        const data = await Book.find(condition);
        res.send(data);
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Error finding documents"
        });
    }
};

const findBookByIsbn = async (req, res) => {
    const { isbn } = req.params;
    try {
        const data = await Book.find({ isbn: isbn });
        if (!data) {
            res.status(404).json({
                message: "Book not available in database."
            });
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message || `Error occurred while finding book in database with id ${isbn}.`
        });
    }
};

const updateBookByIsbn = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Data to update cannot be empty."
        })
    }

    const { isbn } = req.params;

    try {
        const data = await Book.updateOne({ isbn: isbn }, req.body, {
            useFindAndModify: false
        });

        if (!data) {
            res.status(404).json({
                message: `Cannot update Tutorial with ${id}. Tutorial is not in the database.`,
            });
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send({
            message: error.message || `Error updating Book with id ${isbn}`,
        });
    }
};

const deleteBookByIsbn = async (req, res) => {
    const { isbn } = req.params;

    try {
        const data = await Book.deleteOne({ isbn: isbn });
        if (data.deletedCount === 0) {
            res.status(404).json({
                message: `Unable to find book with id ${isbn}`,
            });
        }
        else {
            res.status(200).json({
                message: `Book with id ${isbn} deleted successfully`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message || `Error occurred while deleting book with id - ${isbn}`
        });
    }
};

const deleteAllBooks = async (req, res) => {
    try {
        const data = await Book.deleteMany();
        if (data.deletedCount === 0) {
            res.status(404).json({
                message: "Database is empty."
            });
        }
        else {
            res.status(200).json({
                message: `${data.deletedCount} documents deleted successfully.`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            errorMessage: error.message || "Error occurred while deleting all book documents."
        })
    }
};

module.exports = {
    createBook,
    findAllBooks,
    findBookByIsbn,
    updateBookByIsbn,
    deleteBookByIsbn,
    deleteAllBooks
};

//======================================================

/** var condition = id ? { isbn: { $regex: new RegExp(id), $options: 'i' } } : {};
 * The $ sign in MongoDB query syntax is used to indicate an operator. Operators perform specific functions in MongoDB queries, such as comparison, logical operations, or regular expressions.

In the case of { isbn: { $regex: new RegExp(id), $options: 'i' } }:

$regex: This is the MongoDB operator for regular expressions. It is used to match strings that fit a specified pattern. Here, it's being used to find documents where the isbn field matches the pattern defined by new RegExp(id).

$options: 'i': This option is used with $regex to make the regular expression case-insensitive ('i' stands for "ignore case"). This means that the search will match isbn values regardless of whether they are in uppercase or lowercase.

So, in summary, the $ sign is used because $regex is an operator in MongoDB that enables pattern matching within a query.
 */