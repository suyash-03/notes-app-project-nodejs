const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

//Schema defines the structure of the model
//Model wraps the Schema

const Blog = mongoose.model('blog',blogSchema)

//MongoDB auto pluralizes and looks for that collection in the database -- here 'blogs'

module.exports = Blog