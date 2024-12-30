const mongoose = require('mongoose');


const TodosSchema = new mongoose.Schema({
    id: {
        type: Number || String,
        
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true
    },
    location: String,
});

const Todos = mongoose.model('Todos', TodosSchema);

module.exports = Todos;