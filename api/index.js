// Application dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Application setup
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route definition
app.use(express.static('public'));

const todosRouter = require("../routes/todos");
app.use("/api/todos", todosRouter);

const planetsRouter = require("../routes/planets");
app.use("/api/planets", planetsRouter);

const moviesRouter = require('../routes/movies');
app.use('/api/movies', moviesRouter);

const cityExplorerRouter = require("../routes/cityExplorer");
app.use("/api/cityExplorer", cityExplorerRouter);


app.use("*", fileNotFound);
app.use(errorHandler);
// Route handlers
function fileNotFound (req, res) {
    res.status(404).send("Not Found");
}
function errorHandler (err, req, res) {
    res.status(500).send("I'm sorry, something happened");
}

// App listener
app.listen(port, () => console.log(`Server started on port ${port}`));