const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI_TODOS);

const schema = new mongoose.Schema({
    userId: 'number',
    title: 'string',
    completed: 'boolean',
});

module.exports = conn.model('Todos', schema);