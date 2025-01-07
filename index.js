const express = require('express');

const app = express();

const db = require('./config/database');

const bookDB = require('./models/bookTbl');

app.use(express.urlencoded({ extended: true }))


app.set('view engine','ejs');



app.get('/',(req,res)=>{
    bookDB.find({}).then((data)=>{
        return res.render('bookStore',{data})
    }).catch((err)=>{
        console.log(err);
        return false;
    })
    
});

app.get('/addbook',(req,res)=>{
    return res.render('addbook')
});

app.post('/insertdata',(req,res)=>{
    const {bookImage, bookName , bookType , publisherName } =req.body
    bookDB.create({
        bookImage:bookImage,
        bookName:bookName,
        bookType:bookType,
        publisherName:publisherName,
    }).then((data)=>{
        console.log("Data successfully Inserted..!");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err)
        return false;
    })
})
app.get('/deleteData', (req, res) => {
    let id = req.query.id;
    console.log(id);
    bookDB.findByIdAndDelete(id).then(() => {
        console.log("Data deleted successfully!");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
app.get('/editData', (req, res) => {
    let id = req.query.id;
    bookDB.findById(id).then((data) => {
        return res.render('edit', { data });
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
app.post('/editData', (req, res) => {
    
    const {bookImage, bookName , bookType , publisherName,id } =req.body
    
    console.log(id);
    bookDB.findByIdAndUpdate(id,{
        bookImage:bookImage,
        bookName:bookName,
        bookType:bookType,
        publisherName:publisherName,
    }).then((data)=>{
        console.log("Data Updated!");
        return res.redirect('/');

    }).catch((err)=>{
        console.log(err)
        return false;
    })
})
app.listen(8081, (err) => {
    if (!err) {
        console.log("server strat http://localhost:8081")
    }
})

