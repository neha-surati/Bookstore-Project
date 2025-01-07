const mongoose= require('mongoose');

const bookSchema=new mongoose.Schema({
    bookImage:{
        type:String,
        require:true
    },
     bookName:{
        type:String,
        require:true
    },
    bookType:{
        type:String,
        require:true
    },
    publisherName:{
        type:String,
        require:true
    }
});

const bookDB = mongoose.model('bookTbl',bookSchema);

module.exports=bookDB
