const express = require("express");
const booksRouter = require("./routes/book.routes");
const dbConnect = require("./config/dbConnect");
//const seedBooks = require('./app/seedBooksInDb');
const app = express();

dbConnect();
//seedBooks();

app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.json({ message: "Information Warrior welcomes you." });
});

module.exports = app;


//************************************************

/** app.use(express.raw())
app.use(express.raw()) is a middleware function provided by Express.js to handle requests with raw data as the body, rather than parsed JSON, text, or URL-encoded data. This middleware is used when you need to handle the body of incoming requests as a raw Buffer object, without any parsing.

Key Points:
Purpose: To handle the request body as raw binary data (buffered), useful in cases like handling file uploads, dealing with binary protocols, or processing non-standard payloads.
Use Case: Typically used when you want to process raw data in requests, such as binary payloads, images, or custom formatted data.

Syntax:
app.use(express.raw([options]))
options: You can specify options like type and limit to customize how raw data is handled.

Example:
const express = require('express');
const app = express();

// Middleware to handle raw body data
app.use(express.raw({ type: 'application/octet-stream' }));

app.post('/upload', (req, res) => {
  console.log(req.body); // Raw data as a Buffer object
  res.send('Received raw data');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

How it works:
express.raw(): Converts the request body into a raw Buffer object.
{ type: 'application/octet-stream' }: Specifies the content type to be handled as raw data (e.g., application/octet-stream for binary data). You can specify other types as needed.
In the /upload route, the request body is available as req.body, which will be a Buffer.

Example Request:
Sending a binary file or raw data:
curl -X POST http://localhost:3000/upload --data-binary @file.bin -H "Content-Type: application/octet-stream"

Use Cases:
Handling file uploads without parsing.
Dealing with binary data (e.g., images, videos, custom binary formats).
When you don't want Express to parse the body as JSON, URL-encoded, or text.

Summary:
app.use(express.raw()) processes the request body as raw, unparsed data.
It is useful for handling binary or non-standard request payloads.
 */